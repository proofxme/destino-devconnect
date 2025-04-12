
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
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-300 bg-white rounded-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
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
            <Badge className={`${getCategoryColor(category)} ml-2 self-start`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;
