import { cellToBoundary } from "h3-js";
import type { H3Index, LatLng, LngLatTuple } from "../types/geo";

export function convertFormat(OsrmRoute: readonly LngLatTuple[]): LatLng[] {
  const route = OsrmRoute.map((point) => {
    return {lat: point[1], lng: point[0]}
  })
  return route
}

export function cellBoundaryToLatLngs(cellIndex: H3Index): LatLng[] {
  return cellToBoundary(cellIndex).map(([lat, lng]) => ({ lat, lng }))
}