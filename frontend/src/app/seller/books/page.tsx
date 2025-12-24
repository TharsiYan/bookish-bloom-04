'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { bookAPI, categoryAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function SellerBooksPage() {
  const router = useRouter();
  const { isSeller } = useAuth();
  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: '',
    image: '',
  });

  useEffect(() => {
    if (!isSeller) {
      router.push('/login');
      return;
    }
    loadBooks();
    loadCategories();
  }, [isSeller, router]);

  const loadBooks = async () => {
    try {
      const response = await bookAPI.getMyBooks();
      // Handle both array and paginated responses
      const booksData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.results || []);
      setBooks(booksData);
    } catch (error) {
      console.error('Error loading books:', error);
      setBooks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare data with correct types
      const submitData: any = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
      };
      
      // Validate required fields
      if (!submitData.title || !submitData.author || !submitData.description) {
        alert('Please fill in all required fields (Title, Author, Description)');
        return;
      }
      
      if (isNaN(submitData.price) || submitData.price < 0) {
        alert('Please enter a valid price');
        return;
      }
      
      if (isNaN(submitData.stock_quantity) || submitData.stock_quantity < 0) {
        alert('Please enter a valid stock quantity');
        return;
      }
      
      // Add optional fields only if they have values
      if (formData.isbn && formData.isbn.trim()) {
        submitData.isbn = formData.isbn.trim();
      }
      if (formData.category_id && formData.category_id !== '') {
        submitData.category_id = parseInt(formData.category_id);
      }
      if (formData.image && formData.image.trim()) {
        submitData.image = formData.image.trim();
      }
      
      if (editingBook) {
        await bookAPI.update(editingBook.id, submitData);
      } else {
        await bookAPI.create(submitData);
      }
      setShowForm(false);
      setEditingBook(null);
      resetForm();
      loadBooks();
    } catch (error: any) {
      console.error('Error saving book:', error);
      let errorMessage = 'Failed to save book';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (typeof errorData === 'object') {
          // Handle validation errors
          const errors = Object.entries(errorData)
            .map(([key, value]: [string, any]) => {
              if (Array.isArray(value)) {
                return `${key}: ${value.join(', ')}`;
              }
              return `${key}: ${value}`;
            })
            .join('\n');
          errorMessage = errors || JSON.stringify(errorData);
        }
      }
      
      alert(errorMessage);
    }
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn || '',
      description: book.description,
      price: book.price,
      stock_quantity: book.stock_quantity,
      category_id: book.category?.id || '',
      image: book.image || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await bookAPI.delete(id);
      loadBooks();
    } catch (error) {
      alert('Failed to delete book');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      description: '',
      price: '',
      stock_quantity: '',
      category_id: '',
      image: '',
    });
  };

  if (!isSeller) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingBook(null);
                resetForm();
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add New Book
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Author *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    {editingBook ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingBook(null);
                      resetForm();
                    }}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {book.image ? (
                    <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-xl font-bold text-indigo-600 mb-4">${book.price}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

