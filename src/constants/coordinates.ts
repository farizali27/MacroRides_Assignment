import type { LatLng } from "../types/geo";

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