import { useMemo } from "react";
import { latLngToCell, gridDisk } from "h3-js";
import type { H3Index, LatLng } from "../types/geo";

const H3_RESOLUTION = 10;
const H3_DISK_RADIUS = 3;

export function useH3Corridor(path: LatLng[]): H3Index[] {
  return useMemo(() => {
    if (path.length === 0) return [];

    const cellSet = new Set<string>();

    for (const { lat, lng } of path) {
      const centerCell = latLngToCell(lat, lng, H3_RESOLUTION);
      const disk = gridDisk(centerCell, H3_DISK_RADIUS);
      for (const cell of disk) {
        cellSet.add(cell);
      }
    }

    return Array.from(cellSet);
  }, [path]);
}