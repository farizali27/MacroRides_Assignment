import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { memo, type ReactNode } from "react";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../../constants/config";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import type { LatLng } from "../../types/geo";


interface MapViewProps {
  SOURCE: LatLng | null;
  DESTINATION: LatLng | null;
  children?: ReactNode;
}

function MapView({ SOURCE, DESTINATION, children }: MapViewProps) {
  const greenPinIcon = L.icon({
    iconUrl: "/src/assets/green_pin.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const redPinIcon = L.icon({
    iconUrl: "/src/assets/red_pin.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      center={DEFAULT_MAP_CENTER}
      zoom={DEFAULT_MAP_ZOOM}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {SOURCE && (
        <Marker position={[SOURCE.lat, SOURCE.lng]} icon={greenPinIcon}>
          <Popup>Source</Popup>
        </Marker>
      )}

      {DESTINATION && (
        <Marker position={[DESTINATION.lat, DESTINATION.lng]} icon={redPinIcon}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      {children}
    </MapContainer>
  );
}

export default memo(MapView)
