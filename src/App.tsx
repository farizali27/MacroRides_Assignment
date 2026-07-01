import { useMemo, useState } from "react";
import AppShell from "./components/layout/AppShell";
import StatusBar from "./components/layout/StatusBar";
import ControlPanel from "./components/layout/ControlPanel";
import Legend from "./components/layout/Legend";
import MapView from "./components/map/MapView";
import { getRandomSourceDestination, PICKUP_POINTS } from "./constants/coordinates";
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

/**
 * Top-level composition only. All state below is a placeholder so the
 * layout shells have something to render and type-check against — none
 * of it is wired to real logic yet. Replace these useState calls with your
 * actual hooks (useOsrmRoute, useCorridor, useEligiblePickups,
 * useDriverSimulation) as you build through the roadmap phases.
 */
function App() {
  const [driverState, setDriverState] = useState(INITIAL_DRIVER_STATE);
  const [routeState, setRouteState] = useState(INITIAL_ROUTE_STATE)
  const [isRecalculating] = useState(false);

  const bearing =
    driverState.prevPosition && driverState.position
      ? calculateBearing(
        driverState.prevPosition,
        driverState.position
      )
      : 0;

  const routeLookup = useMemo(() => {
    if (!routeState.path.length) {
      return {
        cumulativeDistance: [],
        totalDistance: 0,
      };
    }

    return buildRouteLookup(routeState.path);
  }, [routeState.path]);

  useDriverSimulation(
    routeState.path,
    routeLookup.cumulativeDistance,
    setDriverState
  );

  // Stub eligibility — replace with useEligiblePickups output in Phase 4.
  const eligibleCount = 0;

  const handleStartDrive = () => {
    // TODO (Phase 5): kick off useDriverSimulation
  };

  const handlePauseDrive = () => {
    // TODO (Phase 5): pause useDriverSimulation
  };

  const runSimulation = async () => {
    // TODO (Phase 5/6): reset driver position, clear any deviation state
    const { SOURCE, DESTINATION } = getRandomSourceDestination()
    setRouteState(prevState => ({
      ...prevState,
      status: "loading",
      source: SOURCE,
      destination: DESTINATION
    }))

    const osrmURL = `http://router.project-osrm.org/route/v1/driving/${SOURCE.lng},${SOURCE.lat};${DESTINATION.lng},${DESTINATION.lat}?overview=full&geometries=geojson`

    console.log("running")
    try {
      const data = await fetchOsrmRoute<OsrmRouteResponse>(osrmURL);
      const osrmRoute = data.routes[0].geometry.coordinates
      const route = convertFormat(osrmRoute)
      setRouteState(prevState => ({
        ...prevState,
        status: "ready",
        path: route
      }))
      setRouteState(prevState => ({
        ...prevState,
        status: "error"
      }))

    } catch (err) {
      console.log(err)
    }
  };

  const handleSimulateDeviation = () => {
    // TODO (Phase 6): pick a deviation point, re-run OSRM + corridor + eligibility
  };

  return (
    <AppShell
      sidebar={
        <>
          <StatusBar
            driverStatus={driverState.status}
            driverPosition={driverState.position}
            eligibleCount={eligibleCount}
            totalPickupCount={PICKUP_POINTS.length}
            routeDistanceMeters={null}
          />
          <ControlPanel
            driverStatus={driverState.status}
            isRecalculating={isRecalculating}
            onResumeDrive={handleStartDrive}
            onPauseDrive={handlePauseDrive}
            onRunSimulation={runSimulation}
            onSimulateDeviation={handleSimulateDeviation}
          />
          <Legend />
        </>
      }
      map={<MapView SOURCE={routeState.source} DESTINATION={routeState.destination}>
        <RouteLayer path={routeState.path} />
        {driverState.position &&
          <DriverMarker
            position={driverState.position}
            bearing={bearing}
          />
        }
        <CorridorLayer path={routeState.path} />
        <FollowDriver position={driverState.position} />
      </MapView>
      }
    />
  );
}

export default App;