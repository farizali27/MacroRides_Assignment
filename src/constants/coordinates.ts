import type { LatLng } from "../types/geo";
import type { PickupPoint } from "../types/pickup";

/**
 * Hardcoded per the assignment's scope decisions. Swap these for any city —
 * nothing downstream assumes a specific location, just real road network
 * coverage (OSRM's public demo server covers most of the world, but quality
 * varies — test your specific points once you wire up Phase 2).
 */

const sourceDestinationPoints: LatLng[] = [
  {lat: 28.62769919667135, lng: 77.21596579195723},
  {lat: 28.5900130311213, lng: 77.24734583598209},
  {lat: 28.577119072479668, lng: 77.2409856900976},
  {lat: 28.603132306592144, lng: 77.20933890662363},
  {lat: 28.576122667785874, lng: 77.196668501048},
  {lat: 28.64153504718349, lng: 77.29009580463914}
]

export function getRandomSourceDestination() {
  const sourceIndex = Math.floor(
    Math.random() * sourceDestinationPoints.length
  );

  let destinationIndex = Math.floor(
    Math.random() * (sourceDestinationPoints.length - 1)
  );

  if (destinationIndex >= sourceIndex) {
    destinationIndex++;
  }

  return {
    SOURCE: sourceDestinationPoints[sourceIndex],
    DESTINATION: sourceDestinationPoints[destinationIndex],
  };
}

export const PICKUP_POINTS: PickupPoint[] = [
  { id: "pp-1", label: "Pickup 1", position: { lat: 26.4601, lng: 80.3355 }, isEligible: false },
  { id: "pp-2", label: "Pickup 2", position: { lat: 26.4685, lng: 80.3398 }, isEligible: false },
  { id: "pp-3", label: "Pickup 3", position: { lat: 26.4540, lng: 80.3460 }, isEligible: false },
  { id: "pp-4", label: "Pickup 4", position: { lat: 26.4820, lng: 80.3300 }, isEligible: false },
  { id: "pp-5", label: "Pickup 5", position: { lat: 26.4750, lng: 80.3520 }, isEligible: false },
];