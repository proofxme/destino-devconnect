
import React from "react";
import { Clock, MapPin, Utensils } from "lucide-react";
import { Restaurant } from "@/api/tripApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface TripRestaurantsListProps {
  restaurants: Restaurant[];
  loading: boolean;
}

const TripRestaurantsList: React.FC<TripRestaurantsListProps> = ({ restaurants, loading }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-16 bg-gray-100">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-3">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-lg">
        <Utensils className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-gray-500">No restaurants added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex">
            <div className="w-20 h-16 overflow-hidden">
              <img 
                src={restaurant.imageUrl || "https://images.unsplash.com/photo-1559925393-8be0ec4767c8"} 
                alt={restaurant.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-3 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{restaurant.name}</h4>
                <Badge className="bg-argentina-sun text-black text-xs">
                  {restaurant.cuisine}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Clock size={12} className="mr-1" />
                <span>{restaurant.date} • {restaurant.time}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <MapPin size={12} className="mr-1" />
                <span>{restaurant.location}</span>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TripRestaurantsList;
