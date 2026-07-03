import { useMemo } from "react";
import type { H3Index } from "../types/geo";
import type { PickupPoint } from "../types/pickup";
import { latLngToCell } from "h3-js";

export function useSetPickupPoints(pickupPoints: PickupPoint[], h3Cells: Set<H3Index>) {
  return useMemo(
    () => {
      return pickupPoints.map((point) => (
        { ...point, isEligible: h3Cells.has(latLngToCell(point.position.lat, point.position.lng, 10)) }
      ))
    },
    [pickupPoints, h3Cells]
  );
}