import { Link } from 'react-router-dom';
import { Category } from '@/types/book';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/books?category=${category.name.toLowerCase()}`}
      className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-1"
    >
      <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
        {category.icon}
      </span>
      <div className="text-center">
        <h3 className="font-serif font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground">{category.count} books</p>
      </div>
    </Link>
  );
}
