
import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, getDaysInMonth, getDay, addDays, isSameMonth, isSameDay } from "date-fns";
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

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EnhancedCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date("2025-11-15"));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date("2025-11-01"));
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeMonth, setActiveMonth] = useState<number>(10); // November (0-indexed)
  const [activeYear, setActiveYear] = useState<number>(2025);

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
    }, 300);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = subMonths(prevMonth, 1);
      setActiveMonth(newMonth.getMonth());
      setActiveYear(newMonth.getFullYear());
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = addMonths(prevMonth, 1);
      setActiveMonth(newMonth.getMonth());
      setActiveYear(newMonth.getFullYear());
      return newMonth;
    });
  };

  const handleMonthClick = (monthIndex: number) => {
    setCurrentMonth(new Date(activeYear, monthIndex, 1));
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
    let day = 1;

    // Create blank cells for days before the start of the month
    for (let i = 0; i < startWeekday; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 w-12 flex items-center justify-center text-gray-400">
          {/* Empty cell */}
        </div>
      );
    }

    // Create cells for days of the month
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = isSameDay(currentDate, selectedDate);
      const hasEvents = datesWithEvents.includes(i);
      
      let bgColor;
      if (isSelected) {
        bgColor = "bg-indigo-500"; // Selected day
      } else if (hasEvents) {
        // Give different colors to days with events (alternating)
        const eventIndex = datesWithEvents.indexOf(i) % 3;
        bgColor = eventIndex === 0 ? "bg-yellow-300" : 
                 eventIndex === 1 ? "bg-purple-300" : "bg-blue-300";
      } else {
        bgColor = "bg-transparent"; // Regular day
      }
      
      days.push(
        <motion.div 
          key={`day-${i}`}
          whileHover={{ scale: 1.1 }}
          className={`h-12 w-12 rounded-full flex items-center justify-center cursor-pointer
                    ${hasEvents && !isSelected ? `${bgColor} text-gray-800` : ''}
                    ${isSelected ? `${bgColor} text-white` : 'hover:bg-gray-100'}`}
          onClick={() => handleDateSelect(currentDate)}
        >
          <span className="text-base">{i}</span>
          {hasEvents && !isSelected && (
            <motion.div 
              className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500"
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

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <motion.div 
          className="w-64 bg-gray-50 py-8 px-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Calendar</h2>

          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-medium flex items-center"
            >
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="mr-2 text-gray-500 hover:text-gray-800"
                onClick={() => setActiveYear(prevYear => prevYear - 1)}
              >
                <ChevronLeft size={20} />
              </motion.button>
              {activeYear}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="ml-2 text-gray-500 hover:text-gray-800"
                onClick={() => setActiveYear(prevYear => prevYear + 1)}
              >
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </div>

          <div className="space-y-4">
            {MONTHS.map((month, i) => (
              <motion.div
                key={month}
                whileHover={{ x: 5 }}
                className={`cursor-pointer py-2 px-3 text-base rounded-lg transition-colors
                          ${activeMonth === i ? 'font-bold text-gray-900' : 'text-gray-500'}`}
                onClick={() => handleMonthClick(i)}
              >
                {month}
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
              {format(selectedDate, "MMM d, EEE")}
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
              <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-indigo-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <motion.div 
            className="grid grid-cols-7 gap-1"
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

            <div className="mt-8 flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.74a.75.75 0 0 1-.7.725l-.015.002h-.012a2.25 2.25 0 0 1-1.052-.173 2.25 2.25 0 0 1-.774-.468 2.25 2.25 0 0 1-.473-.96.75.75 0 0 1 .325-.948A49.645 49.645 0 0 1 11.25 2c1.678 0 3.33.09 4.965.265a.75.75 0 0 1 .655.655Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.152 13.848 1.341-2.682c.138-.275.167-.582.085-.874l-.818-2.874a2.25 2.25 0 0 0-1.501-1.515l-1.58-.454a.624.624 0 0 0-.717.352l-.462.992M14.152 13.848a3.75 3.75 0 0 1-3.944 2.29l-1.032-.232-1.871 1.871c-.12.12-.256.214-.403.277L5.24 18.527a.75.75 0 0 1-.936-.521l-.394-1.975c-.058-.291-.03-.592.083-.859l.292-.689" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCalendar;
