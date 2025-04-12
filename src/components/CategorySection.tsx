
import { Button } from "@/components/ui/button";
import FeaturedCard from "./FeaturedCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWallet } from "@/context/WalletContext";

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
  const { connected } = useWallet();
  const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed" | "none">("collapsed");
  
  // Monitor sidebar state by looking at its width
  useEffect(() => {
    const checkSidebarState = () => {
      // Check if we're on the home page and user is connected
      if (!connected || window.location.pathname !== "/") {
        setSidebarState("none");
        return;
      }
      
      // Get the right sidebar element - if it exists and is visible, check its width
      const sidebar = document.querySelector('.fixed.top-16.right-0');
      
      if (sidebar) {
        const sidebarWidth = sidebar.getBoundingClientRect().width;
        // If width is close to 80px (16 * 5), it's collapsed; if closer to 320px (16 * 20), it's expanded
        if (sidebarWidth < 100) {
          setSidebarState("collapsed");
        } else {
          setSidebarState("expanded");
        }
      } else {
        setSidebarState("none");
      }
    };

    // Check initial state
    checkSidebarState();
    
    // Set up a resize observer to detect sidebar width changes
    const resizeObserver = new ResizeObserver(() => {
      checkSidebarState();
    });
    
    const sidebar = document.querySelector('.fixed.top-16.right-0');
    if (sidebar) {
      resizeObserver.observe(sidebar);
    }
    
    // Also check on window resize as fallback
    window.addEventListener('resize', checkSidebarState);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkSidebarState);
    };
  }, [connected]);
  
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
        
        <div 
          className={`grid gap-6 ${
            sidebarState === "expanded" 
              ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" 
              : sidebarState === "collapsed" 
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" // No sidebar
          }`}
        >
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
