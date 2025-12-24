from rest_framework import serializers
from ..models import Order, OrderItem, Book


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for OrderItem model."""
    book = serializers.StringRelatedField(read_only=True)
    book_id = serializers.IntegerField()
    
    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'book_id', 'quantity', 'price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for Order model."""
    items = OrderItemSerializer(many=True, read_only=True)
    customer = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'customer', 'status', 'total_amount', 'shipping_address',
                  'items', 'created_at', 'updated_at']
        read_only_fields = ['id', 'total_amount', 'created_at', 'updated_at']


class OrderCreateSerializer(serializers.Serializer):
    """Serializer for creating orders."""
    shipping_address = serializers.CharField(required=True)
    items = serializers.ListField(
        child=serializers.DictField(
            child=serializers.IntegerField()
        ),
        required=True
    )
    
    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must have at least one item.")
        return value
    
    def validate(self, attrs):
        items = attrs['items']
        for item in items:
            if 'book_id' not in item or 'quantity' not in item:
                raise serializers.ValidationError("Each item must have 'book_id' and 'quantity'.")
            if item['quantity'] <= 0:
                raise serializers.ValidationError("Quantity must be greater than 0.")
        return attrs

