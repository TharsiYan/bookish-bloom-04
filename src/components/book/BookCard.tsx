import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
    toast({
      title: 'Added to cart',
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  return (
    <Link
      to={`/books/${book.id}`}
      className="group block overflow-hidden rounded-xl bg-card shadow-card card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {book.originalPrice && (
          <div className="absolute left-3 top-3 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            Sale
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-background/90 px-2 py-1 text-xs font-medium backdrop-blur-sm">
          {book.condition}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1 flex items-center gap-1 text-accent">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs font-medium">{book.seller.rating}</span>
        </div>
        <h3 className="font-serif text-base font-semibold leading-tight text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">${book.price.toFixed(2)}</span>
            {book.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            variant="warm"
            onClick={handleAddToCart}
            className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
