import type { LatLng, LngLatTuple } from "../types/geo";

export function convertFormat(OsrmRoute: readonly LngLatTuple[]): LatLng[] {
  const route = OsrmRoute.map((point) => {
    return {lat: point[1], lng: point[0]}
  })
  return route
}