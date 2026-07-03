import { useEffect } from "react";
import type { LatLng } from "../types/geo";
import type { DriverSimulationStatus, DriverState } from "../types/simulation";
import { interpolatePosition } from "../utils/routeInterpolation";

export function useDriverSimulation(
    path: LatLng[],
    cumulativeDistance: number[],
    setDriverState: React.Dispatch<React.SetStateAction<DriverState>>,
    driverStatus: DriverSimulationStatus
) {

    useEffect(() => {
        if (!path.length || driverStatus !== "driving") return;

        const totalDistance = cumulativeDistance[cumulativeDistance.length - 1];

        const id = setInterval(() => {
            setDriverState(prev => {
                const nextDistance = prev.distanceTraveled + prev.speed;

                // destination reached
                if (nextDistance >= totalDistance) {
                    return {
                        ...prev,
                        position: path[path.length - 1],
                        distanceTraveled: totalDistance,
                        posIndex: path.length,
                        status: "idle",
                    };
                }

                const nextPosition = interpolatePosition(
                    path,
                    cumulativeDistance,
                    nextDistance
                );

                return {
                    ...prev,
                    prevPosition: prev.position,
                    position: nextPosition.position,
                    distanceTraveled: nextDistance,
                    posIndex: nextPosition.sliceIndex,
                };
            });
        }, 1000);

        return () => clearInterval(id)
    }, [path, cumulativeDistance, setDriverState, driverStatus]);
}