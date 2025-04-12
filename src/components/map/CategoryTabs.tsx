
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  return (
    <div className="px-4 py-2 bg-gray-50 border-b">
      <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="event">Events</TabsTrigger>
        <TabsTrigger value="accommodation">Accommodations</TabsTrigger>
        <TabsTrigger value="hackerhome">Hacker Houses</TabsTrigger>
        <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
        <TabsTrigger value="activity">Activities</TabsTrigger>
      </TabsList>
    </div>
  );
};

export default CategoryTabs;
