import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  DollarSign,
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { books } from '@/data/mockData';

const SellerDashboard = () => {
  const [myBooks, setMyBooks] = useState(books.slice(0, 4));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    condition: '',
    description: '',
  });

  const stats = [
    {
      label: 'Total Books',
      value: myBooks.length,
      icon: BookOpen,
      change: '+2 this month',
    },
    {
      label: 'Total Sales',
      value: '$1,234',
      icon: DollarSign,
      change: '+12% this month',
    },
    {
      label: 'Active Listings',
      value: myBooks.length,
      icon: Package,
      change: 'All in stock',
    },
    {
      label: 'Page Views',
      value: '2,847',
      icon: Eye,
      change: '+18% this week',
    },
  ];

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Book added!',
      description: `"${newBook.title}" has been listed for sale.`,
    });
    setIsAddDialogOpen(false);
    setNewBook({
      title: '',
      author: '',
      price: '',
      category: '',
      condition: '',
      description: '',
    });
  };

  const handleDeleteBook = (bookId: string, title: string) => {
    setMyBooks((prev) => prev.filter((b) => b.id !== bookId));
    toast({
      title: 'Book removed',
      description: `"${title}" has been removed from your listings.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold">Seller Dashboard</h1>
              <p className="text-muted-foreground">Manage your book listings and sales</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Book
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-serif">List a New Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddBook} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Book Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter book title"
                        value={newBook.title}
                        onChange={(e) =>
                          setNewBook({ ...newBook, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        placeholder="Author name"
                        value={newBook.author}
                        onChange={(e) =>
                          setNewBook({ ...newBook, author: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newBook.price}
                        onChange={(e) =>
                          setNewBook({ ...newBook, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={newBook.category}
                        onValueChange={(value) =>
                          setNewBook({ ...newBook, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fiction">Fiction</SelectItem>
                          <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="children">Children</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Condition</Label>
                      <Select
                        value={newBook.condition}
                        onValueChange={(value) =>
                          setNewBook({ ...newBook, condition: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your book..."
                      rows={3}
                      value={newBook.description}
                      onChange={(e) =>
                        setNewBook({ ...newBook, description: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      List Book
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      index === 0
                        ? 'bg-primary/10 text-primary'
                        : index === 1
                        ? 'bg-secondary/10 text-secondary'
                        : index === 2
                        ? 'bg-accent/10 text-accent'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-secondary" />
                </div>
                <div className="mt-4">
                  <p className="font-serif text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <p className="mt-2 text-xs text-secondary">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Books Table */}
          <div className="rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="font-serif text-lg font-semibold">Your Listings</h2>
              <Button variant="ghost" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Book
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-12 w-9 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {book.author}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="secondary">{book.category}</Badge>
                      </td>
                      <td className="px-4 py-4 font-medium">
                        ${book.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-4">{book.stock}</td>
                      <td className="px-4 py-4">
                        <Badge
                          variant={book.stock > 0 ? 'default' : 'destructive'}
                          className={book.stock > 0 ? 'bg-secondary' : ''}
                        >
                          {book.stock > 0 ? 'Active' : 'Out of Stock'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteBook(book.id, book.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
