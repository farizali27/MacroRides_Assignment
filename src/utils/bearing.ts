import type { LatLng } from "../types/geo";

export function calculateBearing(
    from: LatLng,
    to: LatLng
) {

    const lat1 = from.lat * Math.PI / 180;
    const lat2 = to.lat * Math.PI / 180;

    const dLng = (to.lng - from.lng) * Math.PI / 180;

    const y = Math.sin(dLng) * Math.cos(lat2);

    const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) *
        Math.cos(lat2) *
        Math.cos(dLng);

    return (
        Math.atan2(y, x) *
        180 /
        Math.PI +
        360
    ) % 360;
}