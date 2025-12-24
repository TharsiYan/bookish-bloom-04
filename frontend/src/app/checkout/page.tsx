'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { orderAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
  const router = useRouter();
  const { isCustomer, user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isCustomer) {
      router.push('/login');
      return;
    }
    loadCart();
    if (user?.address) {
      setShippingAddress(user.address);
    }
  }, [isCustomer, user, router]);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (cart.length === 0) {
      setError('Your cart is empty');
      setLoading(false);
      return;
    }

    if (!shippingAddress.trim()) {
      setError('Please enter a shipping address');
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        shipping_address: shippingAddress,
        items: cart.map((item) => ({
          book_id: item.book_id,
          quantity: item.quantity,
        })),
      };

      await orderAPI.create(orderData);
      localStorage.removeItem('cart');
      router.push('/orders');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isCustomer) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
              <button
                onClick={() => router.push('/books')}
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Browse Books
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your shipping address"
                />
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.book_id} className="flex justify-between py-2 border-b">
                      <span>{item.title} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

