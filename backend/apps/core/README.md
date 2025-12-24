# Core API App

The Core API app is the main API-first backend application for BookBridge, built with Django REST Framework.

## Structure

```
apps/core/
├── __init__.py
├── admin.py          # Django admin configuration
├── apps.py           # App configuration
├── models.py         # Database models
├── serializers/      # DRF serializers
│   └── __init__.py
├── viewsets/         # DRF viewsets
│   ├── __init__.py
│   └── api_viewsets.py
├── permissions/      # Custom permissions
│   └── __init__.py
├── urls.py           # URL routing
├── tests.py          # Unit tests
└── migrations/       # Database migrations
```

## API Endpoints

### Health Check
- **GET** `/api/core/health/` - Health check endpoint
- **GET** `/api/core/health-check/` - Alternative health check endpoint

## Usage

### Creating New API Endpoints

1. **Create a Model** (in `models.py`):
```python
from django.db import models

class YourModel(models.Model):
    name = models.CharField(max_length=100)
    # ... other fields
```

2. **Create a Serializer** (in `serializers/your_serializer.py`):
```python
from rest_framework import serializers
from apps.core.models import YourModel

class YourModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = YourModel
        fields = '__all__'
```

3. **Create a ViewSet** (in `viewsets/api_viewsets.py`):
```python
from rest_framework import viewsets
from apps.core.models import YourModel
from apps.core.serializers import YourModelSerializer

class YourModelViewSet(viewsets.ModelViewSet):
    queryset = YourModel.objects.all()
    serializer_class = YourModelSerializer
```

4. **Register in URLs** (in `urls.py`):
```python
router.register(r'your-models', YourModelViewSet, basename='your-model')
```

## Testing

Run the test script:
```bash
python test_api.py
```

Or use Django's test framework:
```bash
python manage.py test apps.core
```

## API-First Principles

This app follows API-first development principles:

- **RESTful Design**: Uses REST conventions
- **ViewSets**: Leverages DRF ViewSets for CRUD operations
- **Serializers**: Data validation and transformation
- **Permissions**: Custom permission classes for access control
- **JWT Authentication**: Token-based authentication ready
- **Versioning**: Ready for API versioning

