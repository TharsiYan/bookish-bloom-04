# BookBridge - Quick Start Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Python 3.11+
- Node.js 18+
- Virtual environment activated (backend)

### Step 1: Start Backend

```bash
cd backend
venv\Scripts\Activate.ps1  # Windows PowerShell
# or: source venv/bin/activate  # Mac/Linux

python manage.py migrate
python manage.py runserver
```

Backend will run on: `http://localhost:8000`

### Step 2: Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:3000`

### Step 3: Test the Application

1. **Register a Customer Account:**
   - Go to `http://localhost:3000/register`
   - Fill in the form and select "Customer" role
   - Click "Create account"

2. **Register a Seller Account:**
   - Go to `http://localhost:3000/register`
   - Fill in the form and select "Seller" role
   - Click "Create account"

3. **As a Seller:**
   - Login with seller account
   - Go to "My Books"
   - Click "Add New Book"
   - Fill in book details and create

4. **As a Customer:**
   - Login with customer account
   - Browse books at `/books`
   - Click on a book to see details
   - Add to cart
   - Go to cart and checkout
   - Place order

### 🎯 Key URLs

**Frontend:**
- Home: `http://localhost:3000`
- Login: `http://localhost:3000/login`
- Register: `http://localhost:3000/register`
- Books: `http://localhost:3000/books`
- Cart: `http://localhost:3000/cart`
- Orders: `http://localhost:3000/orders`
- Seller Books: `http://localhost:3000/seller/books`

**Backend:**
- API Root: `http://localhost:8000/api/core/`
- Admin: `http://localhost:8000/admin`
- Health Check: `http://localhost:8000/api/core/health/`

### 🔧 Troubleshooting

**Backend Issues:**
- If migrations fail, delete `db.sqlite3` and run `python manage.py migrate` again
- Make sure virtual environment is activated
- Check that all dependencies are installed: `pip install -r requirements.txt`

**Frontend Issues:**
- Clear browser cache
- Make sure backend is running
- Check browser console for errors
- Verify API URL in `.env.local` matches backend URL

**CORS Errors:**
- Ensure `CORS_ALLOWED_ORIGINS` in backend settings includes `http://localhost:3000`
- Restart backend server after changing settings

### 📝 Creating Test Data

**Via Django Admin:**
1. Create superuser: `python manage.py createsuperuser`
2. Go to `http://localhost:8000/admin`
3. Login and create categories, books, etc.

**Via API:**
- Use Postman or curl to create books via API
- Register seller account and use frontend to add books

### ✅ Success Indicators

You'll know everything is working when:
- ✅ Backend server starts without errors
- ✅ Frontend server starts without errors
- ✅ You can register and login
- ✅ You can browse books
- ✅ You can add books to cart
- ✅ You can place orders

---

**Happy Coding! 🎉**

