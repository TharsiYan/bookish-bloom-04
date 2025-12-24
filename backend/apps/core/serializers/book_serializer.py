from rest_framework import serializers
from ..models import Book, Category


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model."""
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class BookSerializer(serializers.ModelSerializer):
    """Serializer for Book model."""
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    seller = serializers.StringRelatedField(read_only=True)
    seller_id = serializers.IntegerField(read_only=True)
    in_stock = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'isbn', 'description', 'price', 
                  'stock_quantity', 'category', 'category_id', 'seller', 'seller_id',
                  'image', 'is_active', 'in_stock', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {
            'isbn': {'required': False, 'allow_blank': True},
        }
    
    def create(self, validated_data):
        category_id = validated_data.pop('category_id', None)
        if category_id:
            try:
                category = Category.objects.get(id=category_id)
                validated_data['category'] = category
            except Category.DoesNotExist:
                pass
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        category_id = validated_data.pop('category_id', None)
        if category_id is not None:
            try:
                category = Category.objects.get(id=category_id)
                validated_data['category'] = category
            except Category.DoesNotExist:
                validated_data['category'] = None
        return super().update(instance, validated_data)


class BookListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for book listings."""
    category = serializers.StringRelatedField()
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'price', 'image', 'category', 'in_stock']

