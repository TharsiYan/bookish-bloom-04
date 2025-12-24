'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { bookAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  description: string;
  price: string;
  stock_quantity: number;
  category?: { id: number; name: string };
  image?: string;
  in_stock: boolean;
}

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isCustomer } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    if (params.id) {
      loadBook();
      loadCart();
    }
  }, [params.id]);

  const loadBook = async () => {
    try {
      const response = await bookAPI.getById(Number(params.id));
      setBook(response.data);
    } catch (error) {
      console.error('Error loading book:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const addToCart = () => {
    if (!book || !isCustomer) {
      alert('Please login as a customer to add items to cart');
      return;
    }

    if (!book.in_stock) {
      alert('This book is out of stock');
      return;
    }

    const existingItem = cart.find((item) => item.book_id === book.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map((item) =>
        item.book_id === book.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [
        ...cart,
        {
          book_id: book.id,
          title: book.title,
          price: parseFloat(book.price),
          quantity: quantity,
          image: book.image,
        },
      ];
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Book not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                {book.image ? (
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xl">No Image Available</span>
                  </div>
                )}
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                {book.category && (
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-4">
                    {book.category.name}
                  </span>
                )}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-indigo-600">${book.price}</span>
                  <span className={`ml-4 text-sm px-3 py-1 rounded ${book.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {book.in_stock ? `In Stock (${book.stock_quantity} available)` : 'Out of Stock'}
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{book.description}</p>
                </div>
                {book.isbn && (
                  <div className="mb-6">
                    <span className="text-sm text-gray-600">ISBN: {book.isbn}</span>
                  </div>
                )}
                {isCustomer && book.in_stock && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        max={book.stock_quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(book.stock_quantity, parseInt(e.target.value) || 1)))}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <button
                      onClick={addToCart}
                      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

