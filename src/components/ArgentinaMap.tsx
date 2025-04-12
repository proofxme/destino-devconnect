
import { useEffect, useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import 'leaflet/dist/leaflet.css';
import CategoryTabs from './map/CategoryTabs';
import MapComponent from './map/MapComponent';
import POIList from './map/POIList';
import POICard from './map/POICard';
import { PointOfInterest, pointsOfInterest } from './map/mapUtils';

const ArgentinaMap = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredPOIs, setFilteredPOIs] = useState<PointOfInterest[]>(pointsOfInterest);
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  
  // Filter points of interest based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredPOIs(pointsOfInterest);
    } else {
      setFilteredPOIs(pointsOfInterest.filter(poi => poi.category === activeTab));
    }
  }, [activeTab]);

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg bg-white">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 h-[500px] md:h-[540px]">
            <MapComponent 
              pois={filteredPOIs} 
              onSelectPOI={setSelectedPOI} 
            />
          </div>
          
          <div className="p-4 h-[500px] md:h-[540px] overflow-y-auto">
            <h3 className="font-bold text-lg mb-4">Points of Interest</h3>
            {selectedPOI ? (
              <POICard poi={selectedPOI} onBack={() => setSelectedPOI(null)} />
            ) : (
              <POIList pois={filteredPOIs} onSelect={setSelectedPOI} />
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ArgentinaMap;
