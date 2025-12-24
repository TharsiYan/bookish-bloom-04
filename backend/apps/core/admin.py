from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Category, Book, Order, OrderItem


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom admin for User model."""
    list_display = ['username', 'email', 'role', 'is_active', 'created_at']
    list_filter = ['role', 'is_active', 'is_staff']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('role', 'phone', 'address')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {'fields': ('role', 'phone', 'address')}),
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'price', 'stock_quantity', 'seller', 'category', 'is_active']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['title', 'author', 'isbn']
    readonly_fields = ['created_at', 'updated_at']


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['subtotal']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'status', 'total_amount', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['customer__username', 'id']
    readonly_fields = ['total_amount', 'created_at', 'updated_at']
    inlines = [OrderItemInline]
