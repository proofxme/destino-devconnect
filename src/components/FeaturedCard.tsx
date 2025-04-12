
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeaturedCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  location?: string;
  rating?: number;
}

const FeaturedCard = ({
  title,
  description,
  category,
  imageUrl,
  location,
  rating
}: FeaturedCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-argentina-blue">
          {category}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {rating && (
            <span className="bg-devconnect-primary text-white text-xs px-2 py-1 rounded-full">
              {rating.toFixed(1)} ★
            </span>
          )}
        </div>
        {location && (
          <CardDescription>{location}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-sm line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter>
        <button className="text-devconnect-primary hover:text-devconnect-secondary transition-colors text-sm font-medium">
          Learn More →
        </button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedCard;
