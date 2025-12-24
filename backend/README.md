# BookBridge Backend

Django REST API backend for the BookBridge application.

## Setup Instructions

1. Create and activate a virtual environment
2. Install dependencies: `pip install -r requirements.txt`
3. Create a `.env` file with your configuration
4. Set up MySQL database
5. Run migrations: `python manage.py migrate`
6. Start the server: `python manage.py runserver`

## Project Structure

- `bookbridge/` - Main Django project configuration
- `apps/` - Django applications (add your apps here)
- `manage.py` - Django management script

## API Endpoints

The API will be available at `http://localhost:8000/api/`

