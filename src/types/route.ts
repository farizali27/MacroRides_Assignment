import type { GeoJsonLineString, LatLng } from "./geo";

export interface OsrmRouteResponse {
  code: string;
  routes: OsrmRoute[];
}

export interface OsrmRoute {
  geometry: GeoJsonLineString;
  distance: number; // meters
  duration: number; // seconds
}

export interface RouteState {
  status: "idle" | "loading" | "ready" | "error";
  path: LatLng[];
  source: LatLng | null;
  destination: LatLng | null;
  error: string | null;
}

export const INITIAL_ROUTE_STATE: RouteState = {
  status: "idle",
  path: [],
  source: null,
  destination: null,
  error: null,
};
