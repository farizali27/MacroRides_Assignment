import { cellToBoundary } from "h3-js";
import type { H3Index, LatLng } from "../types/geo";

console.log("Boundary cache module initialized");
const cache = new Map<H3Index, LatLng[]>()

export function getCachedBoundary(cellIndex: H3Index): LatLng[] {
  if (!cache.has(cellIndex))
    cache.set(cellIndex, cellToBoundary(cellIndex).map(([lat, lng]) => ({ lat, lng })))

  return cache.get(cellIndex)!
}

export function clearCache(): void {
  cache.clear()
}
