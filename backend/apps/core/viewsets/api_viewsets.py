"""
API ViewSets for Core application.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class HealthCheckViewSet(viewsets.ViewSet):
    """
    Health check endpoint for API monitoring.
    """
    permission_classes = [AllowAny]

    def list(self, request):
        """
        Returns API health status.
        """
        return Response({
            'status': 'healthy',
            'message': 'BookBridge API is running',
            'version': '1.0.0'
        }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Simple health check endpoint.
    """
    return Response({
        'status': 'healthy',
        'message': 'BookBridge API is running',
        'version': '1.0.0'
    }, status=status.HTTP_200_OK)

