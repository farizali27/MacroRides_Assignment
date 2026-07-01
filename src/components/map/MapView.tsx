import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { ReactNode } from "react";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../../constants/config";
import { getRandomSourceDestination, PICKUP_POINTS } from "../../constants/coordinates";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

export interface MapViewProps {
  /**
   * Extra layers (route, corridor, driver marker, etc.) get passed as
   * children so MapView itself stays a dumb container. This is how
   * RouteLayer/CorridorLayer/DriverMarker will slot in during later
   * phases — they're react-leaflet components that must render *inside*
   * <MapContainer> to access the map context, so they can't just be
   * siblings rendered elsewhere.
   */
  children?: ReactNode;
}

/**
 * Leaflet 101, since this is likely your first time touching it:
 * - <MapContainer> owns the actual Leaflet map instance and viewport state
 *   (center/zoom). Nothing renders without one.
 * - <TileLayer> is the visual basemap (the actual map imagery) — here it's
 *   OpenStreetMap's free tile server. Swappable later if you want a
 *   different look.
 * - <Marker> drops a pin at a LatLng; <Popup> is the little box that opens
 *   on click. Leaflet expects [lat, lng] arrays or {lat, lng} objects —
 *   NOT GeoJSON's [lng, lat] order.
 *
 * Right now this only renders the hardcoded source/destination/pickup
 * markers, so Phase 1 has a working starting point. Everything else
 * (route polyline, corridor polygons, animated driver) comes in as
 * children once Phases 2–5 build those components.
 */
export default function MapView({ children }: MapViewProps) {
  const {SOURCE, DESTINATION} = getRandomSourceDestination()
  const greenPinIcon = L.icon({
    iconUrl: "/src/assets/green_pin.png",
    iconSize: [40, 40],
    iconAnchor: [16, 58],
    popupAnchor: [16, -50],
  });
  const redPinIcon = L.icon({
    iconUrl: "/src/assets/red_pin.png",
    iconSize: [40, 40],
    iconAnchor: [16, 58],
    popupAnchor: [16, -50],
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

      <Marker
        position={[SOURCE.lat, SOURCE.lng]}
        icon={greenPinIcon}
      >
        <Popup>Source</Popup>
      </Marker>

      <Marker
        position={[DESTINATION.lat, DESTINATION.lng]}
        icon={redPinIcon}
      >
        <Popup>Destination</Popup>
      </Marker>

      {PICKUP_POINTS.map((point) => (
        <CircleMarker
          key={point.id}
          center={[point.position.lat, point.position.lng]}
          radius={5}
          pathOptions={{
            fillColor: "gray",
            fillOpacity: 1,
            stroke: false,
          }}
        >
          <Popup>{point.label}</Popup>
        </CircleMarker>
      ))}

      {children}
    </MapContainer>
  );
}
