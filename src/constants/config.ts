/**
 * Central place for the "tunable numbers" of the app, so Phase 3+ work
 * doesn't have magic numbers scattered across hooks/components.
 */

/** Corridor half-width, per the assignment spec. */
export const CORRIDOR_RADIUS_METERS = 350;

/**
 * H3 resolution to index the route/corridor/pickups at.
 * Not fixed yet on purpose — Phase 3 is where you'll decide this for real.
 * Resolution 9 average edge length ~174m, resolution 10 ~65m, as a
 * starting reference while you experiment.
 */
export const H3_RESOLUTION = 9;

/** Public OSRM demo server. Fine for development; consider self-hosting
 * before a real submission if you hit rate limits. */
export const OSRM_BASE_URL = "https://router.project-osrm.org";

/** Default Leaflet map center/zoom, used until a route is loaded. */
export const DEFAULT_MAP_CENTER: [number, number] = [26.4499, 80.3319];
export const DEFAULT_MAP_ZOOM = 13;

/** Driver simulation step interval, in milliseconds. */
export const DRIVER_TICK_INTERVAL_MS = 800;
