"""
Script to create a Django superuser
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookbridge.settings')
django.setup()

from apps.core.models import User

# Check if admin already exists
if User.objects.filter(is_superuser=True).exists():
    admin = User.objects.filter(is_superuser=True).first()
    print(f"Admin user already exists:")
    print(f"Username: {admin.username}")
    print(f"Email: {admin.email}")
    print(f"Role: {admin.role}")
else:
    # Create admin user
    username = "admin"
    email = "admin@bookbridge.com"
    password = "admin123"
    
    admin = User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
        role='admin'
    )
    print("Admin user created successfully!")
    print(f"Username: {username}")
    print(f"Email: {email}")
    print(f"Password: {password}")
    print("\n⚠️  IMPORTANT: Change this password after first login!")

