import type { LatLng } from "./geo";

export type DriverSimulationStatus = "idle" | "driving" | "paused";

export interface DriverState {
  status: DriverSimulationStatus;
  position: LatLng | null;
  prevPosition: LatLng | null;
  distanceTraveled: number;
  speed: number;
}

export const INITIAL_DRIVER_STATE: DriverState = {
  status: "idle",
  position: null,
  prevPosition: null,
  distanceTraveled: 0,
  speed: 50
};
