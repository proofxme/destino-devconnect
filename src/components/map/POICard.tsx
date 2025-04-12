
import { Card, CardContent } from "@/components/ui/card";
import { PointOfInterest } from "./mapUtils";

interface POICardProps {
  poi: PointOfInterest;
  onBack: () => void;
}

const POICard = ({ poi, onBack }: POICardProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="mb-3">
          {poi.imageUrl && (
            <img 
              src={poi.imageUrl} 
              alt={poi.name} 
              className="w-full h-32 object-cover rounded-md mb-3" 
            />
          )}
          <h4 className="font-bold">{poi.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{poi.address}</p>
          <p className="text-sm">{poi.description}</p>
        </div>
        <button 
          onClick={onBack} 
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Back to list
        </button>
      </CardContent>
    </Card>
  );
};

export default POICard;
