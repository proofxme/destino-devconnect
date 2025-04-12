
import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { TripEvent } from "@/api/tripApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface TripEventsListProps {
  events: TripEvent[];
  loading: boolean;
}

const TripEventsList: React.FC<TripEventsListProps> = ({ events, loading }) => {
  // Get badge color based on event type
  const getEventColor = (type: TripEvent["type"]) => {
    switch (type) {
      case "conference":
        return "bg-blue-500";
      case "workshop":
        return "bg-green-500";
      case "social":
        return "bg-purple-500";
      case "hackathon":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-20 bg-gray-100">
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

  if (events.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-lg">
        <Calendar className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-gray-500">No events added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-20 overflow-hidden relative">
            <img 
              src={event.imageUrl || "https://images.unsplash.com/photo-1540304453527-62f979142a17"} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <Badge className={`${getEventColor(event.type)} absolute bottom-2 left-2`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
          </div>
          <CardContent className="p-3">
            <h4 className="font-semibold text-sm">{event.title}</h4>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar size={12} className="mr-1" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MapPin size={12} className="mr-1" />
              <span>{event.location}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TripEventsList;
