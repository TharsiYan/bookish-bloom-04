import { Link } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookCard } from '@/components/book/BookCard';
import { CategoryCard } from '@/components/book/CategoryCard';
import { categories, featuredBooks, newArrivals, bestSellers } from '@/data/mockData';
import { useState } from 'react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.08)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--accent)/0.1)_0%,_transparent_50%)]" />
          
          <div className="container relative py-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
                <Sparkles className="h-4 w-4" />
                Discover your next favorite book
              </div>
              
              <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl animate-slide-up">
                Where Stories Find
                <span className="relative mx-3 text-primary">
                  New Homes
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground md:text-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Connect with book lovers, discover rare finds, and give your beloved books a second chapter. Buy, sell, and explore thousands of titles.
              </p>

              {/* Search Bar */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by title, author, or ISBN..."
                    className="h-14 w-full rounded-xl border-border bg-card pl-12 pr-4 text-base shadow-card focus-visible:ring-2 focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="xl" variant="hero" className="w-full sm:w-auto">
                  Explore Books
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-foreground">50K+</div>
                  <div>Books Listed</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-foreground">12K+</div>
                  <div>Happy Readers</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-foreground">98%</div>
                  <div>Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  Browse Categories
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Find your perfect read by genre
                </p>
              </div>
              <Link to="/books">
                <Button variant="ghost" className="hidden sm:flex">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    Featured Picks
                  </h2>
                  <p className="text-muted-foreground">
                    Hand-picked selections just for you
                  </p>
                </div>
              </div>
              <Link to="/books">
                <Button variant="ghost" className="hidden sm:flex">
                  See All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    Best Sellers
                  </h2>
                  <p className="text-muted-foreground">
                    Top picks from our community
                  </p>
                </div>
              </div>
              <Link to="/books">
                <Button variant="ghost" className="hidden sm:flex">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.map((book, index) => (
                <div
                  key={book.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <BookOpen className="mx-auto mb-6 h-12 w-12 text-primary-foreground/80" />
              <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to Share Your Books?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join thousands of sellers earning from their pre-loved books. List your first book in minutes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link to="/seller">
                  <Button size="lg" className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90">
                    Start Selling
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/books">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Browse Books
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
