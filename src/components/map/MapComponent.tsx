
import { MapContainer, TileLayer, Marker, Popup, MapContainerProps, TileLayerProps, MarkerProps } from 'react-leaflet';
import { PointOfInterest, DEFAULT_CENTER, DEFAULT_ZOOM, getIcon } from './mapUtils';
import 'leaflet/dist/leaflet.css';
import { ReactElement } from 'react';
import L from 'leaflet';
// Fix Leaflet icon issue for webpack
import { fixLeafletIcon } from './leafletFix';

// Initialize fix for Leaflet default icon paths
fixLeafletIcon();

interface MapComponentProps {
  pois: PointOfInterest[];
  onSelectPOI: (poi: PointOfInterest) => void;
}

// Extended types to fix TypeScript errors
interface ExtendedMapContainerProps extends MapContainerProps {
  center: L.LatLngExpression;
  zoom: number;
  scrollWheelZoom: boolean;
}

interface ExtendedTileLayerProps extends TileLayerProps {
  attribution: string;
}

interface ExtendedMarkerProps extends MarkerProps {
  icon: L.Icon;
}

const MapComponent = ({ pois, onSelectPOI }: MapComponentProps): ReactElement => {
  return (
    <div className="h-full w-full">
      <MapContainer 
        className="h-full w-full"
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        {...{} as ExtendedMapContainerProps} // Type assertion to fix TypeScript error
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          {...{} as ExtendedTileLayerProps} // Type assertion to fix TypeScript error
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
            {...{} as ExtendedMarkerProps} // Type assertion to fix TypeScript error
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
