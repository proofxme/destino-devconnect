
import { Button } from "@/components/ui/button";
import FeaturedCard from "./FeaturedCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CategorySectionProps {
  title: string;
  description: string;
  items: {
    id: number;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    location?: string;
    rating?: number;
  }[];
  viewAllLink: string;
}

const CategorySection = ({
  title,
  description,
  items,
  viewAllLink
}: CategorySectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div className="max-w-2xl mb-4 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          <Link to={viewAllLink}>
            <Button variant="outline" className="flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <FeaturedCard
              key={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              imageUrl={item.imageUrl}
              location={item.location}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
