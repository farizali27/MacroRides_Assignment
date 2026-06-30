import type { LatLng } from "./geo";

export interface PickupPoint {
  id: string;
  label: string;
  position: LatLng;
  isEligible: boolean;
}