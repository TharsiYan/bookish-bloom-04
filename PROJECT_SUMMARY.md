# BookBridge - Full Stack E-Commerce Application

## 🎉 Project Complete!

BookBridge is a fully functional online bookstore where sellers can add and sell books, and customers can browse and purchase books.

## 📁 Project Structure

```
BookBridge/
├── backend/                 # Django REST API
│   ├── apps/
│   │   └── core/           # Main application
│   │       ├── models.py   # User, Book, Category, Order, OrderItem
│   │       ├── serializers/ # DRF serializers
│   │       ├── viewsets/    # API viewsets
│   │       ├── permissions.py
│   │       └── urls.py
│   ├── bookbridge/         # Django project settings
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/               # Next.js frontend
    ├── src/
    │   ├── app/            # Next.js pages
    │   │   ├── login/
    │   │   ├── register/
    │   │   ├── books/
    │   │   ├── cart/
    │   │   ├── checkout/
    │   │   ├── orders/
    │   │   └── seller/
    │   ├── components/      # React components
    │   ├── contexts/        # React contexts (Auth)
    │   └── lib/            # API client
    └── package.json
```

## ✨ Features Implemented

### Backend (Django REST Framework)

1. **User Management**
   - Custom User model with roles (customer, seller, admin)
   - JWT authentication
   - Registration and login endpoints

2. **Book Management**
   - CRUD operations for books
   - Category system
   - Stock management
   - Image upload support
   - Search and filtering

3. **Order Management**
   - Order creation
   - Order items
   - Order status tracking
   - Stock deduction on order

4. **API Endpoints**
   - `/api/core/auth/register/` - User registration
   - `/api/core/auth/login/` - User login
   - `/api/core/auth/me/` - Current user
   - `/api/core/books/` - Book CRUD
   - `/api/core/categories/` - Categories
   - `/api/core/orders/` - Order management

### Frontend (Next.js + TypeScript + Tailwind)

1. **Authentication Pages**
   - Login page
   - Registration page (with role selection)

2. **Customer Features**
   - Book listing with search and filters
   - Book details page
   - Shopping cart
   - Checkout process
   - Order history

3. **Seller Features**
   - Book management (CRUD)
   - View all seller's books
   - Add/edit/delete books

4. **UI/UX**
   - Responsive design
   - Clean, modern interface
   - Tailwind CSS styling
   - Navigation bar
   - Loading states
   - Error handling

## 🚀 Getting Started

### Backend Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Activate virtual environment:**
   ```bash
   venv\Scripts\Activate.ps1  # Windows
   source venv/bin/activate   # Mac/Linux
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create .env file:**
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   DB_ENGINE=sqlite
   DB_NAME=bookbridge_db
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=localhost
   DB_PORT=3306
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env.local (optional):**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔐 User Roles

- **Customer**: Browse books, add to cart, place orders
- **Seller**: Add/edit/delete books, manage inventory
- **Admin**: Full access (via Django admin)

## 📝 API Documentation

### Authentication
- `POST /api/core/auth/register/` - Register new user
- `POST /api/core/auth/login/` - Login user
- `GET /api/core/auth/me/` - Get current user (requires auth)

### Books
- `GET /api/core/books/` - List all books (with filters)
- `GET /api/core/books/{id}/` - Get book details
- `POST /api/core/books/` - Create book (seller only)
- `PATCH /api/core/books/{id}/` - Update book (owner only)
- `DELETE /api/core/books/{id}/` - Delete book (owner only)

### Orders
- `GET /api/core/orders/` - List user's orders
- `POST /api/core/orders/` - Create order (customer only)
- `PATCH /api/core/orders/{id}/update_status/` - Update order status

## 🛠️ Technologies Used

### Backend
- Django 6.0
- Django REST Framework
- Django REST Framework SimpleJWT
- Django CORS Headers
- Django Filter
- Pillow (for image handling)
- SQLite (development) / MySQL (production ready)

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios

## 📋 Next Steps / Future Enhancements

1. **Image Upload**: Implement actual image upload functionality
2. **Payment Integration**: Add payment gateway (Stripe, PayPal)
3. **Email Notifications**: Send order confirmations
4. **Reviews & Ratings**: Allow customers to review books
5. **Wishlist**: Add wishlist functionality
6. **Advanced Search**: Full-text search with Elasticsearch
7. **Admin Dashboard**: Enhanced admin interface
8. **Analytics**: Sales and inventory analytics
9. **Mobile App**: React Native mobile app
10. **Testing**: Add unit and integration tests

## 🐛 Known Issues / Notes

- Image upload is configured but requires proper file handling setup
- MySQL client requires Visual C++ Build Tools on Windows (see INSTALL_MYSQLCLIENT.md)
- Currently using SQLite for development (easier setup)

## 📄 License

This project is for educational purposes.

## 👥 Author

Created as a full-stack development project demonstrating Django REST Framework and Next.js integration.

---

**Status**: ✅ Fully functional and ready for development/extension!

