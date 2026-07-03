import { latLngToCell, gridDisk } from "h3-js";
import type { H3Index, LatLng } from "../types/geo";

const H3_RESOLUTION = 10;
const H3_DISK_RADIUS = 3;

export function generateH3Corridor(path: LatLng[]): Set<H3Index> {
    const cellSet = new Set<H3Index>();

    for (const { lat, lng } of path) {
        const center = latLngToCell(lat, lng, H3_RESOLUTION);

        for (const cell of gridDisk(center, H3_DISK_RADIUS)) {
            cellSet.add(cell);
        }
    }
    return cellSet;
}