from rest_framework import permissions


class IsSellerOrReadOnly(permissions.BasePermission):
    """
    Custom permission: Only sellers can create/edit books.
    Others can only read.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_seller


class IsBookOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission: Only book owners can edit their books.
    Others can only read.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.seller == request.user


class IsCustomerOrReadOnly(permissions.BasePermission):
    """
    Custom permission: Only customers can create orders.
    Others can only read.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_customer

