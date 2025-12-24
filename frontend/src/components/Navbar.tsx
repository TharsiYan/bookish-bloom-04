'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/books" className="text-2xl font-bold text-indigo-600">
              BookBridge
            </Link>
            <div className="flex space-x-4">
              <Link href="/books" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Books
              </Link>
              {isAuthenticated && (
                <>
                  <Link href="/cart" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                    Cart
                  </Link>
                  {user?.role === 'seller' && (
                    <Link href="/seller/books" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                      My Books
                    </Link>
                  )}
                  {user?.role === 'customer' && (
                    <Link href="/orders" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                      My Orders
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 text-sm">Hello, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

