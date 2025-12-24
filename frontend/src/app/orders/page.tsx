'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { orderAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadOrders();
  }, [isAuthenticated, router]);

  const loadOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      // Handle both array and paginated responses
      const ordersData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.results || []);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">You have no orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Shipping Address:</p>
                    <p className="text-gray-800">{order.shipping_address}</p>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.book} x {item.quantity}</span>
                          <span>${item.subtotal}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                      <span>Total</span>
                      <span>${order.total_amount}</span>
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

