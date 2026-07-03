
export interface LatLng {
  lat: number;
  lng: number;
}

export type LngLatTuple = [lng: number, lat: number];

export interface GeoJsonLineString {
  type: "LineString";
  coordinates: LngLatTuple[];
}

export type H3Index = string;
