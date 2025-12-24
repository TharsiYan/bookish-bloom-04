from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    """
    Custom User model with role-based access control.
    """
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('seller', 'Seller'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.username} ({self.role})"
    
    @property
    def is_customer(self):
        return self.role == 'customer'
    
    @property
    def is_seller(self):
        return self.role == 'seller'
    
    @property
    def is_admin(self):
        return self.role == 'admin'


class Category(models.Model):
    """
    Book categories for organization.
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'categories'
        verbose_name_plural = 'Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Book(models.Model):
    """
    Book model for the bookstore.
    """
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    isbn = models.CharField(max_length=20, unique=True, blank=True, null=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    stock_quantity = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='books')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books', limit_choices_to={'role': 'seller'})
    image = models.ImageField(upload_to='books/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'books'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['title', 'author']),
            models.Index(fields=['category']),
            models.Index(fields=['seller']),
        ]
    
    def __str__(self):
        return f"{self.title} by {self.author}"
    
    @property
    def in_stock(self):
        return self.stock_quantity > 0


class Order(models.Model):
    """
    Order model for customer purchases.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', limit_choices_to={'role': 'customer'})
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'orders'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Order #{self.id} - {self.customer.username} - {self.status}"
    
    def calculate_total(self):
        """Calculate total amount from order items."""
        total = sum(item.subtotal for item in self.items.all())
        self.total_amount = total
        self.save()
        return total


class OrderItem(models.Model):
    """
    Individual items within an order.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'order_items'
        unique_together = ['order', 'book']
    
    def __str__(self):
        return f"{self.quantity}x {self.book.title} in Order #{self.order.id}"
    
    def save(self, *args, **kwargs):
        """Calculate subtotal before saving."""
        self.subtotal = self.price * self.quantity
        super().save(*args, **kwargs)
        self.order.calculate_total()
