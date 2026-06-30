import type { LatLng } from "../types/geo";
import type { PickupPoint } from "../types/pickup";

/**
 * Hardcoded per the assignment's scope decisions. Swap these for any city —
 * nothing downstream assumes a specific location, just real road network
 * coverage (OSRM's public demo server covers most of the world, but quality
 * varies — test your specific points once you wire up Phase 2).
 */

export const SOURCE: LatLng = {
  lat: 26.4499,
  lng: 80.3319,
};

export const DESTINATION: LatLng = {
  lat: 26.4906,
  lng: 80.3447,
};

export const PICKUP_POINTS: PickupPoint[] = [
  { id: "pp-1", label: "Pickup 1", position: { lat: 26.4601, lng: 80.3355 }, isEligible: false },
  { id: "pp-2", label: "Pickup 2", position: { lat: 26.4685, lng: 80.3398 }, isEligible: false },
  { id: "pp-3", label: "Pickup 3", position: { lat: 26.4540, lng: 80.3460 }, isEligible: false },
  { id: "pp-4", label: "Pickup 4", position: { lat: 26.4820, lng: 80.3300 }, isEligible: false },
  { id: "pp-5", label: "Pickup 5", position: { lat: 26.4750, lng: 80.3520 }, isEligible: false },
];
