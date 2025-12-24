'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface CartItem {
  book_id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CartPage() {
  const router = useRouter();
  const { isCustomer } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!isCustomer) {
      router.push('/login');
      return;
    }
    loadCart();
  }, [isCustomer, router]);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const updateQuantity = (bookId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(bookId);
      return;
    }
    const newCart = cart.map((item) =>
      item.book_id === bookId ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (bookId: number) => {
    const newCart = cart.filter((item) => item.book_id !== bookId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isCustomer) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
              <Link
                href="/books"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Browse Books
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.book_id} className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.book_id, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.book_id, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.book_id)}
                        className="text-red-600 text-sm hover:text-red-800 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    className="block w-full bg-indigo-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

