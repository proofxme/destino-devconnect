
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

type EventCategory = "conference" | "workshop" | "social" | "hackathon";

interface EventCardProps {
  id: number;
  title: string;
  date: Date;
  location: string;
  category: EventCategory;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  location,
  category,
  description
}) => {
  // Get badge color based on event category
  const getCategoryColor = (category: EventCategory) => {
    switch (category) {
      case "conference":
        return "bg-blue-500 hover:bg-blue-600";
      case "workshop":
        return "bg-green-500 hover:bg-green-600";
      case "social":
        return "bg-purple-500 hover:bg-purple-600";
      case "hackathon":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-2 hover:border-argentina-blue transition-all duration-300 shadow-md hover:shadow-xl">
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-3 bg-gradient-to-r from-argentina-blue to-devconnect-primary" />
            <Badge className={`${getCategoryColor(category)} absolute top-3 right-3 font-medium`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <Calendar size={14} className="mr-1" />
              <span>{format(date, "MMM d, yyyy")}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {location}
            </p>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;
