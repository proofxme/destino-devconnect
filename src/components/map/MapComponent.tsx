
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PointOfInterest, DEFAULT_CENTER, DEFAULT_ZOOM, getIcon } from './mapUtils';
import 'leaflet/dist/leaflet.css';
import { ReactElement } from 'react';

interface MapComponentProps {
  pois: PointOfInterest[];
  onSelectPOI: (poi: PointOfInterest) => void;
}

const MapComponent = ({ pois, onSelectPOI }: MapComponentProps): ReactElement => {
  return (
    <div className="h-full w-full">
      <MapContainer 
        className="h-full w-full"
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {pois.map((poi) => (
          <Marker 
            key={poi.id}
            position={poi.position}
            icon={getIcon(poi.category)}
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
