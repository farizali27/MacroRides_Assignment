import { latLngToCell, gridDisk } from "h3-js";
import type { H3Index, LatLng } from "../types/geo";

const H3_RESOLUTION = 10;
const H3_DISK_RADIUS = 3;

export function generateH3Corridor(path: LatLng[]): Map<H3Index, number> {
    const cellLastSeen = new Map<H3Index, number>()

    path.forEach(({ lat, lng }, routeIndex) => {
        const center = latLngToCell(lat, lng, H3_RESOLUTION);

        for (const cell of gridDisk(center, H3_DISK_RADIUS)) {
            cellLastSeen.set(cell, routeIndex)
        }
    })
    return cellLastSeen
}