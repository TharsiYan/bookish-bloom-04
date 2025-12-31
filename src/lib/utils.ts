import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// API configuration for Django backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  data: T;
  status: number;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
}

interface LoginResponse {
  user: User;
  tokens: AuthTokens;
  message: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  role?: 'customer' | 'seller';
  phone?: string;
  address?: string;
}

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || error.detail || 'Request failed');
  }

  const data = await response.json();
  return { data, status: response.status };
}

export const authAPI = {
  login: async (credentials: { username: string; password: string }) => {
    return apiFetch<LoginResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (data: RegisterData) => {
    return apiFetch<LoginResponse>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getCurrentUser: async () => {
    return apiFetch<User>('/auth/me/');
  },

  refreshToken: async (refreshToken: string) => {
    return apiFetch<{ access: string }>('/auth/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  },
};

export const booksAPI = {
  getAll: async (params?: { category?: string; search?: string; page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', params.page.toString());
    
    const queryString = searchParams.toString();
    return apiFetch<unknown>(`/books/${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id: string) => {
    return apiFetch<unknown>(`/books/${id}/`);
  },

  create: async (bookData: unknown) => {
    return apiFetch<unknown>('/books/', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  },

  update: async (id: string, bookData: unknown) => {
    return apiFetch<unknown>(`/books/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  },

  delete: async (id: string) => {
    return apiFetch<void>(`/books/${id}/`, {
      method: 'DELETE',
    });
  },
};

export const ordersAPI = {
  getAll: async () => {
    return apiFetch<unknown>('/orders/');
  },

  getById: async (id: string) => {
    return apiFetch<unknown>(`/orders/${id}/`);
  },

  create: async (orderData: unknown) => {
    return apiFetch<unknown>('/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
};

export { API_BASE_URL };
export type { AuthTokens, LoginResponse };
