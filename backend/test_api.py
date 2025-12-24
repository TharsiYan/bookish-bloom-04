"""
Simple script to test the Core API endpoints.
"""
import requests
import sys

def test_health_endpoint():
    """Test the health check endpoint."""
    try:
        # Test router-based endpoint
        response = requests.get('http://localhost:8000/api/core/health/')
        print(f"Health endpoint (router): Status {response.status_code}")
        print(f"Response: {response.json()}")
        
        # Test direct endpoint
        response2 = requests.get('http://localhost:8000/api/core/health-check/')
        print(f"\nHealth endpoint (direct): Status {response2.status_code}")
        print(f"Response: {response2.json()}")
        
        return response.status_code == 200
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to server. Make sure the server is running.")
        print("Start the server with: python manage.py runserver")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == '__main__':
    success = test_health_endpoint()
    sys.exit(0 if success else 1)

