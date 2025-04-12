
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Event = {
  id: number;
  title: string;
  date: Date;
  location: string;
  category: "conference" | "workshop" | "social" | "hackathon";
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

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date("2025-11-15"));
  const [selectedEvents, setSelectedEvents] = useState<Event[]>(
    events.filter(event => format(event.date, "yyyy-MM-dd") === format(new Date("2025-11-15"), "yyyy-MM-dd"))
  );

  // Function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(
      event => format(event.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
  };

  // Handler for date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedEvents(getEventsForDay(date));
    }
  };

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return events.some(
      event => format(event.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
  };

  // Get badge color based on event category
  const getCategoryColor = (category: string) => {
    switch (category) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border p-3 pointer-events-auto"
          modifiersStyles={{
            selected: { backgroundColor: "#1EAEDB" },
            today: { border: "1px solid #1EAEDB" }
          }}
          modifiers={{
            hasEvent: (date) => isDayWithEvent(date)
          }}
          styles={{
            day: { hasEvent: { fontWeight: "bold", textDecoration: "underline" } }
          }}
        />
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-500">Conference</Badge>
            <Badge className="bg-green-500">Workshop</Badge>
            <Badge className="bg-purple-500">Social</Badge>
            <Badge className="bg-orange-500">Hackathon</Badge>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No Date Selected"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </Badge>
                          <h3 className="font-bold mt-2">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {event.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm mt-3">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No events scheduled for this date</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCalendar;
