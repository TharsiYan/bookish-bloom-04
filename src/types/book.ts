export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  stock: number;
  isbn?: string;
  publishedYear?: number;
  pages?: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
