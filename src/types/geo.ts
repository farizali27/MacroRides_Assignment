/**
 * Shared geometry types.
 *
 * A note on ordering, because it WILL bite you otherwise:
 * - GeoJSON and OSRM both use [longitude, latitude] order.
 * - Leaflet uses [latitude, longitude] order (or a {lat, lng} object).
 * - This file's `LatLng` is the Leaflet-friendly shape. Anything coming
 *   from OSRM/GeoJSON should pass through a conversion helper
 *   (see utils/geoConversions.ts) before it reaches a Leaflet component.
 */

/** Leaflet-style coordinate: (lat, lng). */
export interface LatLng {
  lat: number;
  lng: number;
}

/** GeoJSON-style coordinate pair: [lng, lat]. */
export type LngLatTuple = [lng: number, lat: number];

/** Minimal GeoJSON LineString, shaped like what OSRM returns for a route. */
export interface GeoJsonLineString {
  type: "LineString";
  coordinates: LngLatTuple[];
}

/** An H3 cell index, represented as its string form (h3-js's default). */
export type H3Index = string;
