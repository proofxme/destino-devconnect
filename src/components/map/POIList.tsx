
import { Card, CardContent } from "@/components/ui/card";
import { PointOfInterest } from "./mapUtils";

interface POIListProps {
  pois: PointOfInterest[];
  onSelect: (poi: PointOfInterest) => void;
}

const POIList = ({ pois, onSelect }: POIListProps) => {
  return (
    <div className="space-y-2">
      {pois.map((poi) => (
        <Card 
          key={poi.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSelect(poi)}
        >
          <CardContent className="p-3">
            <h4 className="font-medium">{poi.name}</h4>
            <p className="text-xs text-gray-600">{poi.address}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default POIList;
