import type { LatLng } from "../types/geo";

export interface RouteLookup {
    cumulativeDistance: number[];
    totalDistance: number;
}

function distance(a: LatLng, b: LatLng) {
    const R = 6371000;

    const lat1 = a.lat * Math.PI / 180;
    const lat2 = b.lat * Math.PI / 180;

    const dLat = lat2 - lat1;
    const dLng = (b.lng - a.lng) * Math.PI / 180;

    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(dLng / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(h));
}

export function buildRouteLookup(path: LatLng[]): RouteLookup {

    const cumulativeDistance = [0];

    for (let i = 1; i < path.length; i++) {

        cumulativeDistance.push(
            cumulativeDistance[i - 1] +
            distance(path[i - 1], path[i])
        );
    }

    return {
        cumulativeDistance,
        totalDistance:
            cumulativeDistance[cumulativeDistance.length - 1],
    };
}

export function interpolatePosition(
    path: LatLng[],
    cumulative: number[],
    targetDistance: number
): { sliceIndex: number, position: LatLng } {

    if (targetDistance <= 0)
        return { sliceIndex: 1, position: path[0] };

    if (targetDistance >= cumulative[cumulative.length - 1])
        return { sliceIndex: path.length, position: path[path.length - 1] };

    let lo = 0;
    let hi = cumulative.length - 1;

    while (lo < hi) {

        const mid = Math.floor((lo + hi) / 2);

        if (cumulative[mid] < targetDistance)
            lo = mid + 1;
        else
            hi = mid;
    }

    const segmentEnd = lo;
    const segmentStart = segmentEnd - 1;

    const startDistance = cumulative[segmentStart];
    const endDistance = cumulative[segmentEnd];

    const t =
        (targetDistance - startDistance) /
        (endDistance - startDistance);

    const a = path[segmentStart];
    const b = path[segmentEnd];

    return {
        sliceIndex: segmentEnd,
        position: {
            lat: a.lat + (b.lat - a.lat) * t,
            lng: a.lng + (b.lng - a.lng) * t,
        }
    }
}