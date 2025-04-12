
import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, getDaysInMonth, getDay, addDays, isSameMonth, isSameDay, isAfter, isBefore } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Bell, Settings, MoreVertical } from "lucide-react";
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
    date: new Date("2025-11-14"),
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

// Define constants
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Event month and current month
const EVENT_MONTH = new Date("2025-11-01");
const CURRENT_MONTH = new Date();

const EnhancedCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date("2025-11-14"));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date("2025-11-01"));
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeMonth, setActiveMonth] = useState<number>(10); // November (0-indexed)

  // Get visible months (current month to event month)
  const getVisibleMonths = () => {
    const visibleMonths = [];
    let startDate = new Date();
    const endDate = new Date("2025-11-30");
    
    // Only add months between current month and event end
    while (startDate <= endDate) {
      const monthIndex = startDate.getMonth();
      const year = startDate.getFullYear();
      
      if (!visibleMonths.find(m => m.month === monthIndex && m.year === year)) {
        visibleMonths.push({
          month: monthIndex,
          year: year,
          name: MONTHS[monthIndex]
        });
      }
      
      startDate = addMonths(startDate, 1);
    }
    
    return visibleMonths;
  };
  
  // Get visible months
  const visibleMonths = getVisibleMonths();

  // Function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(
      event => isSameDay(event.date, day)
    );
  };

  // Get dates with events in the current month
  const getDatesWithEvents = (month: Date) => {
    return events
      .filter(event => isSameMonth(event.date, month))
      .map(event => event.date.getDate());
  };

  // Handler for date selection
  const handleDateSelect = (date: Date) => {
    setIsLoading(true);
    setSelectedDate(date);
    
    // Simulate loading with a small delay
    setTimeout(() => {
      setDisplayedEvents(getEventsForDay(date));
      setIsLoading(false);
    }, 200);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = subMonths(prevMonth, 1);
      
      // Don't go before current month
      if (isBefore(newMonth, new Date()) && newMonth.getMonth() < new Date().getMonth()) {
        return prevMonth;
      }
      
      setActiveMonth(newMonth.getMonth());
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = addMonths(prevMonth, 1);
      
      // Don't go past event month (November 2025)
      if (isAfter(newMonth, new Date("2025-11-30"))) {
        return prevMonth;
      }
      
      setActiveMonth(newMonth.getMonth());
      return newMonth;
    });
  };

  const handleMonthClick = (monthIndex: number, year: number) => {
    setCurrentMonth(new Date(year, monthIndex, 1));
    setActiveMonth(monthIndex);
  };

  // Initialize selected events
  useEffect(() => {
    setDisplayedEvents(getEventsForDay(selectedDate));
  }, []);

  // Function to render calendar days
  const renderCalendarDays = () => {
    const datesWithEvents = getDatesWithEvents(currentMonth);
    const monthStart = startOfMonth(currentMonth);
    const totalDays = getDaysInMonth(monthStart);
    const startWeekday = getDay(monthStart);
    
    const days = [];
    
    // Create blank cells for days before the start of the month
    for (let i = 0; i < startWeekday; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 w-10 flex items-center justify-center text-gray-400">
          {/* Empty cell */}
        </div>
      );
    }

    // Create cells for days of the month
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = isSameDay(currentDate, selectedDate);
      const hasEvents = datesWithEvents.includes(i);
      
      let bgColor = "bg-transparent";
      let textColor = "text-gray-700";
      
      if (isSelected) {
        bgColor = "bg-blue-500";
        textColor = "text-white";
      } else if (hasEvents) {
        // Different colors for days with events based on categories
        const eventIndex = datesWithEvents.indexOf(i) % 4;
        if (eventIndex === 0) bgColor = "bg-blue-100";
        if (eventIndex === 1) bgColor = "bg-purple-100";
        if (eventIndex === 2) bgColor = "bg-yellow-100"; 
        if (eventIndex === 3) bgColor = "bg-green-100";
      }
      
      days.push(
        <motion.div 
          key={`day-${i}`}
          whileHover={{ scale: 1.1 }}
          className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer relative
                    ${bgColor} ${textColor}`}
          onClick={() => handleDateSelect(currentDate)}
        >
          <span className="text-base">{i}</span>
          {hasEvents && !isSelected && (
            <motion.div 
              className="absolute bottom-0 w-1 h-1 rounded-full bg-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          )}
        </motion.div>
      );
    }
    
    return days;
  };

  // Get the current day name and format
  const formattedSelectedDate = format(selectedDate, "MMM d, EEE");

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <motion.div 
          className="w-64 bg-gray-50 py-8 px-6 border-r border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Calendar</h2>

          {/* Only show visible months */}
          <div className="space-y-1">
            {visibleMonths.map(({ month, year, name }) => (
              <motion.div
                key={`${name}-${year}`}
                whileHover={{ x: 5 }}
                className={`cursor-pointer py-3 px-4 text-base rounded-lg transition-colors
                          ${activeMonth === month ? 'font-bold bg-gray-100 text-gray-900' : 'text-gray-500'}`}
                onClick={() => handleMonthClick(month, year)}
              >
                {name} {year !== new Date().getFullYear() ? year : ''}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Calendar Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-bold"
            >
              {formattedSelectedDate}
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Settings size={20} className="text-gray-500" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell size={20} className="text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <MoreVertical size={20} className="text-gray-500" />
              </motion.button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={handlePrevMonth}
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </motion.button>
            
            <h3 className="text-lg font-medium">
              {format(currentMonth, "MMMM yyyy")}
            </h3>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={handleNextMonth}
            >
              <ChevronRight size={24} className="text-gray-600" />
            </motion.button>
          </div>

          {/* Calendar Days Header */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {DAYS.map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-blue-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <motion.div 
            className="grid grid-cols-7 gap-1 place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}`}
            transition={{ duration: 0.3 }}
          >
            {renderCalendarDays()}
          </motion.div>

          {/* Events Section */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
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
              ) : displayedEvents.length > 0 ? (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium mb-4">Events for {format(selectedDate, "MMM d, yyyy")}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {displayedEvents.map(event => (
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
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>This month you have {events.filter(event => isSameMonth(event.date, currentMonth)).length} events to attend</p>
              <p>Completed 0 events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCalendar;
