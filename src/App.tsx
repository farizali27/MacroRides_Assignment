import { useCallback, useMemo, useState } from "react";
import AppShell from "./components/layout/AppShell";
import StatusBar from "./components/layout/StatusBar";
import ControlPanel from "./components/layout/ControlPanel";
import Legend from "./components/layout/Legend";
import MapView from "./components/map/MapView";
import { getRandomDestination, getRandomSourceDestination } from "./constants/coordinates";
import { INITIAL_DRIVER_STATE } from "./types/simulation";
import { INITIAL_ROUTE_STATE, type OsrmRouteResponse } from "./types/route";
import "./App.css";
import { fetchOsrmRoute } from "./utils/fetchOsrmRoute";
import { convertFormat } from "./utils/convertFormat";
import RouteLayer from "./components/map/RouteLayer";
import CorridorLayer from "./components/map/CorridorLayer";
import { buildRouteLookup } from "./utils/routeInterpolation";
import { useDriverSimulation } from "./hooks/useDriverSimulation";
import { calculateBearing } from "./utils/bearing";
import DriverMarker from "./components/map/DriverMarker";
import FollowDriver from "./components/map/FollowDriver";
import { useH3Corridor } from "./hooks/useH3Corridor";
import { useSetPickupPoints } from "./hooks/useSetPickupPoints";
import PickupPointsLayer from "./components/map/PickupPointsLayer";
import { PICKUP_POINTS } from "./constants/pickups";
import type { LatLng } from "./types/geo";

function App() {
  const [driverState, setDriverState] = useState(INITIAL_DRIVER_STATE);
  const [routeState, setRouteState] = useState(INITIAL_ROUTE_STATE)

  const bearing = useMemo(
    () =>
      driverState.prevPosition && driverState.position
        ? calculateBearing(driverState.prevPosition, driverState.position)
        : 0,
    [driverState.prevPosition, driverState.position]
  );

  const routeLookup = useMemo(() => {
    if (!routeState.path.length) {
      return {
        cumulativeDistance: [],
        totalDistance: 0,
      };
    }

    return buildRouteLookup(routeState.path);
  }, [routeState.path]);

  const remainingDistance = useMemo(() => {
    if (!routeLookup.totalDistance || !driverState.distanceTraveled) return null;
    return Math.max(0, routeLookup.totalDistance - driverState.distanceTraveled);
  }, [routeLookup.totalDistance, driverState.distanceTraveled]);


  const h3Cells = useH3Corridor(routeState.path, driverState.posIndex);
  const pickupPoints = useSetPickupPoints(PICKUP_POINTS, h3Cells)

  useDriverSimulation(
    routeState.path,
    routeLookup.cumulativeDistance,
    setDriverState,
    driverState.status
  );

  const eligibleCount = useMemo(
    () => pickupPoints.filter(p => p.isEligible).length,
    [pickupPoints]
  );

  const handleStartDrive = useCallback(() => {
    setDriverState(prev => ({ ...prev, status: "driving" }))
  }, [])

  const handlePauseDrive = useCallback(() => {
    setDriverState(prev => ({ ...prev, status: "paused" }))
  }, [])

  const loadRoute = useCallback(
    async (
      source: LatLng,
      destination: LatLng,
      bearing?: number
    ) => {
      setRouteState(prev => ({
        ...prev,
        status: "loading",
        source,
        destination,
      }));

      setDriverState(prev => ({
        ...prev,
        position: source,
        distanceTraveled: 0,
      }));

      const url = bearing ?
        `http://router.project-osrm.org/route/v1/driving/${source.lng},${source.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&bearings=${bearing},20;`
        : `http://router.project-osrm.org/route/v1/driving/${source.lng},${source.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`

      try {
        const data = await fetchOsrmRoute<OsrmRouteResponse>(url);

        const route = convertFormat(
          data.routes[0].geometry.coordinates
        );

        setRouteState(prev => ({
          ...prev,
          status: "ready",
          path: route,
        }));

        handleStartDrive();
      } catch (err) {
        console.error(err);

        setRouteState(prev => ({
          ...prev,
          status: "error",
        }));
      }
    }, [handleStartDrive])


  const runSimulation = useCallback(async () => {
    const { SOURCE, DESTINATION } = getRandomSourceDestination()
    await loadRoute(SOURCE, DESTINATION)
  }, [loadRoute])

  const handleChangeDestination = useCallback(async () => {
    handlePauseDrive()
    const source = driverState.position
    if (!source) return
    const destination = getRandomDestination()
    await loadRoute(source, destination, Math.round(bearing))
  }, [handlePauseDrive, driverState, loadRoute])

  return (
    <AppShell
      sidebar={
        <>
          <StatusBar
            routeStatus={routeState.status}
            driverStatus={driverState.status}
            driverPosition={driverState.position}
            eligibleCount={eligibleCount}
            totalPickupCount={PICKUP_POINTS.length}
            totalDistanceMeters={routeLookup.totalDistance || null}
            remainingDistanceMeters={remainingDistance}
          />
          <ControlPanel
            driverStatus={driverState.status}
            routeStatus={routeState.status}
            onResumeDrive={handleStartDrive}
            onPauseDrive={handlePauseDrive}
            onRunSimulation={runSimulation}
            onChangeDestination={handleChangeDestination}
          />
          <Legend />
        </>
      }
      map={<MapView SOURCE={routeState.source} DESTINATION={routeState.destination}>
        {routeState.status === "ready" && <RouteLayer position={driverState.position} path={routeState.path} sliceIndex={driverState.posIndex} />}
        {routeState.status === "ready" && <DriverMarker
          position={driverState.position!}
          bearing={bearing}
        />}
        {routeState.status === "ready" && <CorridorLayer corridorCells={h3Cells} />}
        <FollowDriver position={driverState.position} />
        <PickupPointsLayer pickupPoints={pickupPoints} />
      </MapView>
      }
    />
  );
}

export default App;