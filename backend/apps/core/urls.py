"""
URL configuration for Core API app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.core.viewsets import (
    HealthCheckViewSet,
    health_check,
    RegisterView,
    login_view,
    current_user_view,
    BookViewSet,
    CategoryViewSet,
    OrderViewSet,
)

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'health', HealthCheckViewSet, basename='health')
router.register(r'books', BookViewSet, basename='book')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    # Router-based endpoints
    path('', include(router.urls)),
    
    # Direct function-based endpoints
    path('health-check/', health_check, name='health-check-direct'),
    
    # Authentication endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', login_view, name='login'),
    path('auth/me/', current_user_view, name='current-user'),
]
