from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Order, OrderItem, Book
from ..serializers import OrderSerializer, OrderCreateSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """ViewSet for Order model."""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_customer:
            return Order.objects.filter(customer=user)
        elif user.is_seller:
            # Sellers can see orders for their books
            return Order.objects.filter(items__book__seller=user).distinct()
        elif user.is_admin:
            return Order.objects.all()
        return Order.objects.none()
    
    def create(self, request, *args, **kwargs):
        """Create a new order from cart items."""
        if not request.user.is_customer:
            return Response(
                {'error': 'Only customers can create orders'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create order
        order = Order.objects.create(
            customer=request.user,
            shipping_address=serializer.validated_data['shipping_address'],
            status='pending'
        )
        
        # Create order items
        total = 0
        for item_data in serializer.validated_data['items']:
            try:
                book = Book.objects.get(id=item_data['book_id'], is_active=True)
                quantity = item_data['quantity']
                
                if book.stock_quantity < quantity:
                    order.delete()
                    return Response(
                        {'error': f'Insufficient stock for {book.title}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Create order item
                order_item = OrderItem.objects.create(
                    order=order,
                    book=book,
                    quantity=quantity,
                    price=book.price
                )
                
                # Update book stock
                book.stock_quantity -= quantity
                book.save()
                
                total += order_item.subtotal
            except Book.DoesNotExist:
                order.delete()
                return Response(
                    {'error': f'Book with id {item_data["book_id"]} not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        order.total_amount = total
        order.save()
        
        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def update_status(self, request, pk=None):
        """Update order status (for sellers and admins)."""
        order = self.get_object()
        
        if not (request.user.is_seller or request.user.is_admin):
            return Response(
                {'error': 'Only sellers and admins can update order status'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        new_status = request.data.get('status')
        if new_status not in dict(Order.STATUS_CHOICES):
            return Response(
                {'error': 'Invalid status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = new_status
        order.save()
        
        return Response(OrderSerializer(order).data)

