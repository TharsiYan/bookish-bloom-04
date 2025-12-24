import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, User } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { books } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { BookCard } from '@/components/book/BookCard';

const BookDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const book = books.find((b) => b.id === id);
  const relatedBooks = books.filter((b) => b.category === book?.category && b.id !== id).slice(0, 4);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold">Book not found</h1>
            <p className="mt-2 text-muted-foreground">The book you're looking for doesn't exist.</p>
            <Link to="/books">
              <Button className="mt-4">Browse Books</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity}x "${book.title}" has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(book, quantity);
    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          {/* Breadcrumb */}
          <Link
            to="/books"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to books
          </Link>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <div className="sticky top-24 overflow-hidden rounded-2xl bg-muted">
                <img
                  src={book.image}
                  alt={book.title}
                  className="aspect-[3/4] w-full object-cover"
                />
                {book.originalPrice && (
                  <Badge className="absolute left-4 top-4 bg-primary">
                    Save ${(book.originalPrice - book.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{book.category}</Badge>
                <Badge variant="outline">{book.condition}</Badge>
                <div className="flex items-center gap-1 text-accent">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{book.seller.rating}</span>
                </div>
              </div>

              {/* Title & Author */}
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  {book.title}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl font-bold text-primary">
                  ${book.price.toFixed(2)}
                </span>
                {book.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-2 font-serif font-semibold">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </div>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-muted/30 p-4">
                {book.isbn && (
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">ISBN</p>
                    <p className="text-sm font-medium">{book.isbn}</p>
                  </div>
                )}
                {book.publishedYear && (
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Published</p>
                    <p className="text-sm font-medium">{book.publishedYear}</p>
                  </div>
                )}
                {book.pages && (
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Pages</p>
                    <p className="text-sm font-medium">{book.pages}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Stock</p>
                  <p className="text-sm font-medium">{book.stock} available</p>
                </div>
              </div>

              {/* Seller Info */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{book.seller.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span>{book.seller.rating} rating</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center rounded-lg border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-r-none"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-l-none"
                      onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    variant="hero"
                    className="flex-1"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="ghost" className="px-4">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 font-serif text-2xl font-bold">You May Also Like</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedBooks.map((relatedBook) => (
                  <BookCard key={relatedBook.id} book={relatedBook} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetailsPage;
