import type { GeoJsonLineString, LatLng } from "./geo";

/**
 * Shape of the pieces of an OSRM /route response you actually need.
 * OSRM returns more than this (legs, steps, waypoints) — extend as you
 * need more of it during Phase 2.
 */
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
