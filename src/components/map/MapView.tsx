import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { ReactNode } from "react";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../../constants/config";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import type { LatLng } from "../../types/geo";

interface MapViewProps {
  /**
   * Extra layers (route, corridor, driver marker, etc.) get passed as
   * children so MapView itself stays a dumb container. This is how
   * RouteLayer/CorridorLayer/DriverMarker will slot in during later
   * phases — they're react-leaflet components that must render *inside*
   * <MapContainer> to access the map context, so they can't just be
   * siblings rendered elsewhere.
   */
  SOURCE: LatLng | null;
  DESTINATION: LatLng | null;
  children?: ReactNode;
}

export default function MapView({ SOURCE, DESTINATION, children }: MapViewProps) {
  const greenPinIcon = L.icon({
    iconUrl: "/src/assets/green_pin.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],   // horizontal center, very bottom of image
    popupAnchor: [0, -40],   // popup appears directly above
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
