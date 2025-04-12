
import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EventCard from "./EventCard";

type EventCategory = "conference" | "workshop" | "social" | "hackathon";

type Event = {
  id: number;
  title: string;
  date: Date;
  location: string;
  category: EventCategory;
  description: string;
};

// Sample events data for Argentina Devconnect
const events: Event[] = [
  {
    id: 1,
    title: "Devconnect Buenos Aires",
    date: new Date("2025-11-15"),
    location: "La Rural, Buenos Aires",
    category: "conference",
    description: "The main Devconnect event gathering blockchain developers from across the globe."
  },
  {
    id: 2,
    title: "ETHLatam",
    date: new Date("2025-11-12"),
    location: "Centro Cultural Konex, Buenos Aires",
    category: "conference",
    description: "Latin America's largest Ethereum community event with talks, workshops and networking."
  },
  {
    id: 3,
    title: "Web3 Hackers Meetup",
    date: new Date("2025-11-10"),
    location: "Area 3, Palermo, Buenos Aires",
    category: "social",
    description: "An informal gathering for web3 developers to connect and share ideas."
  },
  {
    id: 4,
    title: "DeFi Workshop",
    date: new Date("2025-11-14"),
    location: "Universidad de Buenos Aires",
    category: "workshop",
    description: "Hands-on workshop exploring the latest in decentralized finance protocols."
  },
  {
    id: 5,
    title: "ZK Hackathon",
    date: new Date("2025-11-18"),
    location: "Casa Ethereum, Palermo",
    category: "hackathon",
    description: "48-hour hackathon focused on zero-knowledge proof applications."
  },
  {
    id: 6,
    title: "Blockchain & Asado",
    date: new Date("2025-11-16"),
    location: "Puerto Madero, Buenos Aires",
    category: "social",
    description: "Traditional Argentine barbecue with blockchain enthusiasts by the waterfront."
  }
];

const EnhancedCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date("2025-11-15"));
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [animationDirection, setAnimationDirection] = useState<"right" | "left">("right");
  const [isLoading, setIsLoading] = useState(false);

  // Function to get events for a specific day
  const getEventsForDay = (day: Date | undefined) => {
    if (!day) return [];
    return events.filter(
      event => format(event.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
  };

  // Handler for date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setIsLoading(true);
      
      // Determine animation direction based on date comparison
      if (selectedDate && date > selectedDate) {
        setAnimationDirection("right");
      } else {
        setAnimationDirection("left");
      }
      
      setSelectedDate(date);
      
      // Simulate loading with a small delay for smoother transitions
      setTimeout(() => {
        setSelectedEvents(getEventsForDay(date));
        setIsLoading(false);
      }, 300);
    }
  };

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return events.some(
      event => format(event.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
  };

  // Initialize selected events
  useEffect(() => {
    if (selectedDate) {
      setSelectedEvents(getEventsForDay(selectedDate));
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: (direction: "right" | "left") => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: (direction: "right" | "left") => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8
      }
    })
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:col-span-1"
      >
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-argentina-blue to-devconnect-primary h-2"></div>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Events Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border-0 p-0 w-full"
              modifiers={{
                hasEvent: isDayWithEvent
              }}
              modifiersStyles={{
                selected: {
                  backgroundColor: "#1EAEDB",
                  color: "white",
                  fontWeight: "bold",
                  transform: "scale(1.1)",
                  borderRadius: "9999px",
                },
                hasEvent: {
                  fontWeight: "bold",
                  boxShadow: "inset 0 0 0 2px #1EAEDB",
                  borderRadius: "9999px",
                  color: "#1EAEDB"
                },
                today: {
                  fontWeight: "bold",
                  border: "2px solid #1EAEDB",
                  borderRadius: "9999px",
                }
              }}
              classNames={{
                day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-full flex items-center justify-center mx-auto transition-all text-sm",
                day_selected: "bg-argentina-blue text-white hover:bg-argentina-blue-dark rounded-full transform scale-110 transition-transform",
                day_today: "border-2 border-argentina-blue text-argentina-blue font-bold rounded-full",
                day_disabled: "text-gray-300",
                day_outside: "text-gray-400 opacity-50",
                day_range_middle: "bg-blue-50",
                day_hidden: "invisible",
                caption_label: "text-xl font-bold text-gray-800",
                root: "w-full",
                nav_button: "p-1 hover:bg-gray-100 rounded-full transition-colors",
                nav_button_previous: "mr-auto",
                nav_button_next: "ml-auto",
                head_cell: "font-medium text-sm text-gray-600 w-10 h-10 flex items-center justify-center",
                table: "w-full border-collapse",
                row: "flex w-full mt-2 justify-around",
                cell: "p-0 text-center relative h-10 w-10",
                head_row: "flex w-full justify-around"
              }}
            />

            <div className="mt-6 space-y-2">
              <h3 className="font-bold text-lg text-gray-800">Event Types</h3>
              <div className="flex flex-wrap gap-2">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge className="bg-blue-500 hover:bg-blue-600 cursor-pointer">Conference</Badge>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge className="bg-green-500 hover:bg-green-600 cursor-pointer">Workshop</Badge>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge className="bg-purple-500 hover:bg-purple-600 cursor-pointer">Social</Badge>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge className="bg-orange-500 hover:bg-orange-600 cursor-pointer">Hackathon</Badge>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:col-span-2"
      >
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 h-full">
          <div className="bg-gradient-to-r from-argentina-blue to-devconnect-primary h-2"></div>
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              {selectedDate && (
                <motion.div
                  key={selectedDate.toString()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {format(selectedDate, "MMMM d, yyyy")}
                </motion.div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <AnimatePresence mode="wait" custom={animationDirection}>
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-48"
                >
                  <div className="relative h-12 w-12">
                    <div className="absolute h-12 w-12 rounded-full border-4 border-t-argentina-blue border-b-transparent border-l-transparent border-r-transparent animate-spin"></div>
                  </div>
                </motion.div>
              ) : selectedEvents.length > 0 ? (
                <motion.div
                  key={selectedDate?.toString()}
                  custom={animationDirection}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="no-events"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg h-48 mt-2"
                >
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }} 
                    transition={{ 
                      type: "spring", 
                      stiffness: 100,
                      repeatType: "reverse",
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    <div className="text-6xl mb-4">📅</div>
                  </motion.div>
                  <p className="text-center text-gray-500 text-lg">No events scheduled for this date</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedCalendar;
