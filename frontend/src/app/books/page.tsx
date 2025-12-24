'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { bookAPI, categoryAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  image?: string;
  category: string;
  in_stock: boolean;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBooks();
    loadCategories();
  }, [selectedCategory, searchTerm]);

  const loadBooks = async () => {
    try {
      const params: any = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;
      
      const response = await bookAPI.getAll(params);
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading books...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Books</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search books..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  {book.image ? (
                    <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-indigo-600">${book.price}</span>
                      <span className={`text-xs px-2 py-1 rounded ${book.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {book.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {books.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No books found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

