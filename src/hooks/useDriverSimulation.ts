import { useEffect } from "react";
import type { LatLng } from "../types/geo";
import type { DriverState } from "../types/simulation";
import { interpolatePosition } from "../utils/routeInterpolation";

export function useDriverSimulation(
    path: LatLng[],
    cumulativeDistance: number[],
    setDriverState: React.Dispatch<React.SetStateAction<DriverState>>
) {
    useEffect(() => {
        if (!path.length) return;

        const id = setInterval(() => {

            setDriverState(prev => {

                const nextDistance =
                    prev.distanceTraveled + prev.speed;

                const nextPosition = interpolatePosition(
                    path,
                    cumulativeDistance,
                    nextDistance
                );

                return {
                    ...prev,
                    prevPosition: prev.position,
                    position: nextPosition,
                    distanceTraveled: nextDistance,
                };
            });

        }, 1000);

        return () => clearInterval(id);

    }, [path, cumulativeDistance, setDriverState]);
}