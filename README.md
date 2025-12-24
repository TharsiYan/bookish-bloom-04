# BookBridge

A professional full-stack web application for book management, built with Django (backend), Next.js (frontend), and MySQL (database).

## 🏗️ Project Structure

```
BookBridge/
├── backend/                 # Django backend application
│   ├── bookbridge/         # Main Django project
│   ├── apps/               # Django applications
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Node.js dependencies
│
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Python** 3.11 or higher
- **Node.js** 18.x or higher
- **MySQL** 8.0 or higher
- **pip** (Python package manager)
- **npm** or **yarn** (Node.js package manager)

### Backend Setup (Django)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory
   - Copy the structure from `.env.example` and fill in your values:
     ```
     SECRET_KEY=your-secret-key-here
     DEBUG=True
     ALLOWED_HOSTS=localhost,127.0.0.1
     DB_NAME=bookbridge_db
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_HOST=localhost
     DB_PORT=3306
     CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
     ```

6. **Create MySQL database:**
   ```sql
   CREATE DATABASE bookbridge_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

7. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

8. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

9. **Run the development server:**
   ```bash
   python manage.py runserver
   ```
   
   The backend will be available at `http://localhost:8000`

### Frontend Setup (Next.js)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables (optional):**
   - Create a `.env.local` file in the `frontend` directory:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:8000/api
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   The frontend will be available at `http://localhost:3000`

## 🛠️ Technology Stack

### Backend
- **Django 5.0.1** - High-level Python web framework
- **Django REST Framework** - Powerful toolkit for building Web APIs
- **MySQL** - Relational database management system
- **django-cors-headers** - Handling Cross-Origin Resource Sharing (CORS)
- **python-dotenv** - Environment variable management

### Frontend
- **Next.js 14** - React framework for production
- **TypeScript** - Typed superset of JavaScript
- **React 18** - JavaScript library for building user interfaces
- **Axios** - HTTP client for API requests

## 📁 Development Guidelines

### Backend Development
- Place all Django apps in the `backend/apps/` directory
- Follow Django's app structure conventions
- Use Django REST Framework for API endpoints
- Keep environment variables in `.env` file (never commit this file)

### Frontend Development
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Place reusable components in `src/components/`
- Place utility functions in `src/lib/`
- Use the API client in `src/lib/api.ts` for backend communication

## 🔒 Security Best Practices

- Never commit `.env` files or sensitive information
- Use strong secret keys in production
- Set `DEBUG=False` in production
- Configure proper CORS settings
- Use environment variables for all sensitive configuration

## 📝 API Documentation

Once the backend is running, you can access:
- **Django Admin Panel**: `http://localhost:8000/admin`
- **API Root**: `http://localhost:8000/api`

## 🧪 Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

### Frontend Testing
```bash
cd frontend
npm run lint
```

## 📦 Building for Production

### Backend
```bash
cd backend
python manage.py collectstatic
python manage.py migrate
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name/Team

## 🙏 Acknowledgments

- Django Documentation
- Next.js Documentation
- MySQL Documentation

---

**Note**: This is a professional project structure following industry best practices and university-level standards. Make sure to customize the configuration according to your specific requirements.

