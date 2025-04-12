
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PointOfInterest, DEFAULT_CENTER, DEFAULT_ZOOM } from './mapUtils';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  pois: PointOfInterest[];
  onSelectPOI: (poi: PointOfInterest) => void;
}

const MapComponent = ({ pois, onSelectPOI }: MapComponentProps) => {
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {pois.map((poi) => (
          <Marker 
            key={poi.id}
            position={poi.position}
            eventHandlers={{
              click: () => {
                onSelectPOI(poi);
              },
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{poi.name}</h3>
                <p className="text-sm text-gray-600">{poi.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
