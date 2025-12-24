import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const shipping = totalPrice > 35 ? 0 : 4.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  const handleRemove = (bookId: string, title: string) => {
    removeFromCart(bookId);
    toast({
      title: 'Removed from cart',
      description: `"${title}" has been removed from your cart.`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: 'Proceeding to checkout',
      description: 'This would redirect to payment in a real app.',
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any books yet.
            </p>
            <Link to="/books">
              <Button className="mt-6" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            Continue shopping
          </Link>

          <h1 className="mb-8 font-serif text-3xl font-bold">Shopping Cart</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.book.id}
                    className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
                  >
                    {/* Image */}
                    <Link to={`/books/${item.book.id}`} className="shrink-0">
                      <img
                        src={item.book.image}
                        alt={item.book.title}
                        className="h-32 w-24 rounded-lg object-cover transition-opacity hover:opacity-80"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          to={`/books/${item.book.id}`}
                          className="font-serif font-semibold hover:text-primary transition-colors"
                        >
                          {item.book.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.book.author}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Condition: {item.book.condition}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center rounded-lg border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() =>
                              updateQuantity(item.book.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() =>
                              updateQuantity(
                                item.book.id,
                                Math.min(item.book.stock, item.quantity + 1)
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-primary">
                            ${(item.book.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemove(item.book.id, item.book.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" className="text-muted-foreground" onClick={clearCart}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="mb-4 font-serif text-lg font-semibold">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-secondary">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 font-semibold">
                    <span>Total</span>
                    <span className="text-lg text-primary">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Add ${(35 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}

                {/* Checkout Button */}
                <Button
                  size="lg"
                  variant="hero"
                  className="mt-6 w-full"
                  onClick={handleCheckout}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Checkout
                </Button>

                {/* Trust */}
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  🔒 Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
