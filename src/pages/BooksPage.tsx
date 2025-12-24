import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookCard } from '@/components/book/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { books, categories } from '@/data/mockData';
import { Slider } from '@/components/ui/slider';

const BooksPage = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((book) =>
        selectedCategories.includes(book.category.toLowerCase())
      );
    }

    // Filter by condition
    if (selectedConditions.length > 0) {
      result = result.filter((book) => selectedConditions.includes(book.condition));
    }

    // Filter by price
    result = result.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.publishedYear || 0) - (a.publishedYear || 0));
        break;
      case 'rating':
        result.sort((a, b) => b.seller.rating - a.seller.rating);
        break;
    }

    return result;
  }, [selectedCategories, selectedConditions, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setPriceRange([0, 50]);
    setSortBy('featured');
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedConditions.length +
    (priceRange[0] > 0 || priceRange[1] < 50 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="mb-3 font-serif font-semibold">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.name.toLowerCase())}
                onCheckedChange={() => toggleCategory(category.name.toLowerCase())}
              />
              <Label
                htmlFor={`cat-${category.id}`}
                className="flex-1 cursor-pointer text-sm"
              >
                {category.name}
              </Label>
              <span className="text-xs text-muted-foreground">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h4 className="mb-3 font-serif font-semibold">Condition</h4>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center gap-2">
              <Checkbox
                id={`cond-${condition}`}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => toggleCondition(condition)}
              />
              <Label htmlFor={`cond-${condition}`} className="cursor-pointer text-sm">
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3 font-serif font-semibold">Price Range</h4>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={50}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">${priceRange[0]}</span>
            <span className="text-muted-foreground">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-8">
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Browse Books
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover {books.length} books from our community of sellers
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-serif font-semibold">Filters</h3>
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {/* Mobile Filter */}
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <span className="text-sm text-muted-foreground">
                    {filteredBooks.length} results
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden items-center rounded-lg border border-border sm:flex">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Books Grid */}
              {filteredBooks.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3'
                      : 'space-y-4'
                  }
                >
                  {filteredBooks.map((book, index) => (
                    <div
                      key={book.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Filter className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">No books found</h3>
                  <p className="mt-1 text-muted-foreground">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BooksPage;
