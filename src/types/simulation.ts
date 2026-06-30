import type { LatLng } from "./geo";

export type DriverSimulationStatus = "idle" | "driving" | "paused";

export interface DriverState {
  status: DriverSimulationStatus;
  position: LatLng | null;
  distanceTraveled: number;
}

export const INITIAL_DRIVER_STATE: DriverState = {
  status: "idle",
  position: null,
  distanceTraveled: 0,
};
