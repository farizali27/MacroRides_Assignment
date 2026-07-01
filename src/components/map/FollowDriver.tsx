import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import type { LatLng } from "../../types/geo";

interface Props {
    position: LatLng | null;
}

export default function FollowDriver({ position }: Props) {
    const map = useMap();
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (!position) return;

        if (firstUpdate.current) {
            map.flyTo([position.lat, position.lng], 16, {
                animate: true,
                duration: 1.5,
            });

            firstUpdate.current = false;
        } else {
            map.panTo([position.lat, position.lng], {
                animate: true,
                duration: 1,
            });
        }
    }, [position, map]);

    return null;
}