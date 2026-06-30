import { useState } from "react";
import AppShell from "./components/layout/AppShell";
import StatusBar from "./components/layout/StatusBar";
import ControlPanel from "./components/layout/ControlPanel";
import Legend from "./components/layout/Legend";
import MapView from "./components/map/MapView";
import { PICKUP_POINTS } from "./constants/coordinates";
import { INITIAL_DRIVER_STATE } from "./types/simulation";
import { INITIAL_ROUTE_STATE } from "./types/route";
import "./App.css";

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

  // Stub eligibility — replace with useEligiblePickups output in Phase 4.
  const eligibleCount = 0;

  const handleStartDrive = () => {
    // TODO (Phase 5): kick off useDriverSimulation
  };

  const handlePauseDrive = () => {
    // TODO (Phase 5): pause useDriverSimulation
  };

  const runSimulation = () => {
    // TODO (Phase 5/6): reset driver position, clear any deviation state
    console.log("run simulation")
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
      map={<MapView />}
    />
  );
}

export default App;
// define and initialize routeState