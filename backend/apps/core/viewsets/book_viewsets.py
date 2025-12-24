from rest_framework import viewsets, status
from rest_framework import filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Book, Category
from ..serializers import BookSerializer, BookListSerializer, CategorySerializer
from apps.core.permissions import IsSellerOrReadOnly


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Category - read-only for all users."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None


class BookViewSet(viewsets.ModelViewSet):
    """ViewSet for Book model."""
    queryset = Book.objects.filter(is_active=True)
    permission_classes = [IsSellerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'seller']
    search_fields = ['title', 'author', 'isbn']
    ordering_fields = ['price', 'created_at', 'title']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return BookListSerializer
        return BookSerializer
    
    def get_queryset(self):
        queryset = Book.objects.filter(is_active=True)
        # Sellers can see their own inactive books
        if self.request.user.is_authenticated and self.request.user.is_seller:
            if self.request.query_params.get('my_books') == 'true':
                return Book.objects.filter(seller=self.request.user)
        return queryset
    
    def perform_create(self, serializer):
        # Automatically set seller to current user
        serializer.save(seller=self.request.user)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_books(self, request):
        """Get books owned by the current seller."""
        if not request.user.is_seller:
            return Response(
                {'error': 'Only sellers can access this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )
        books = Book.objects.filter(seller=request.user)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

