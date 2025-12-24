import { useState } from 'react';
import {
  Users,
  BookOpen,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Search,
  MoreHorizontal,
  Ban,
  CheckCircle,
  Trash2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { books } from '@/data/mockData';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'buyer', status: 'active', orders: 12 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'seller', status: 'active', orders: 0, listings: 8 },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'buyer', status: 'suspended', orders: 3 },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'seller', status: 'active', orders: 0, listings: 15 },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'buyer', status: 'active', orders: 7 },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(mockUsers);
  const [allBooks, setAllBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      label: 'Total Users',
      value: '12,847',
      icon: Users,
      change: '+234 this month',
      color: 'primary',
    },
    {
      label: 'Total Books',
      value: '50,432',
      icon: BookOpen,
      change: '+1,234 this month',
      color: 'secondary',
    },
    {
      label: 'Revenue',
      value: '$128,450',
      icon: DollarSign,
      change: '+18% this month',
      color: 'accent',
    },
    {
      label: 'Orders',
      value: '3,847',
      icon: ShoppingCart,
      change: '+456 this week',
      color: 'muted',
    },
  ];

  const handleUserAction = (userId: string, action: 'suspend' | 'activate' | 'delete') => {
    if (action === 'delete') {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast({ title: 'User deleted', description: 'The user has been removed.' });
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, status: action === 'suspend' ? 'suspended' : 'active' }
            : u
        )
      );
      toast({
        title: action === 'suspend' ? 'User suspended' : 'User activated',
        description: `The user has been ${action === 'suspend' ? 'suspended' : 'activated'}.`,
      });
    }
  };

  const handleBookAction = (bookId: string, action: 'remove') => {
    setAllBooks((prev) => prev.filter((b) => b.id !== bookId));
    toast({ title: 'Book removed', description: 'The listing has been removed.' });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, books, and platform settings
            </p>
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
                      stat.color === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : stat.color === 'secondary'
                        ? 'bg-secondary/10 text-secondary'
                        : stat.color === 'accent'
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

          {/* Tabs */}
          <Tabs defaultValue="users" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
              </TabsList>

              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Users Tab */}
            <TabsContent value="users">
              <div className="rounded-xl border border-border bg-card shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/30">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Activity
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <Badge
                              variant={user.status === 'active' ? 'default' : 'destructive'}
                              className={user.status === 'active' ? 'bg-secondary' : ''}
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm text-muted-foreground">
                            {user.role === 'buyer'
                              ? `${user.orders} orders`
                              : `${user.listings} listings`}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {user.status === 'active' ? (
                                    <DropdownMenuItem
                                      onClick={() => handleUserAction(user.id, 'suspend')}
                                    >
                                      <Ban className="mr-2 h-4 w-4" />
                                      Suspend User
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() => handleUserAction(user.id, 'activate')}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Activate User
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleUserAction(user.id, 'delete')}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Books Tab */}
            <TabsContent value="books">
              <div className="rounded-xl border border-border bg-card shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/30">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Book
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Seller
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          Price
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredBooks.map((book) => (
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
                                <p className="text-sm text-muted-foreground">{book.author}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm">{book.seller.name}</td>
                          <td className="px-4 py-4">
                            <Badge variant="secondary">{book.category}</Badge>
                          </td>
                          <td className="px-4 py-4 font-medium">${book.price.toFixed(2)}</td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleBookAction(book.id, 'remove')}
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
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
