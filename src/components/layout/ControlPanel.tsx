import { memo } from "react";
import type { DriverSimulationStatus } from "../../types/simulation";

export interface ControlPanelProps {
  routeStatus: "idle" | "loading" | "ready" | "error";
  driverStatus: DriverSimulationStatus;
  onResumeDrive: () => void;
  onPauseDrive: () => void;
  onRunSimulation: () => void;
  onChangeDestination: () => void;
}

function ControlPanel({
  routeStatus,
  driverStatus,
  onResumeDrive,
  onPauseDrive,
  onRunSimulation,
  onChangeDestination,
}: ControlPanelProps) {
  const isLoading = routeStatus === "loading";

  return (
    <section
      aria-label="Simulation controls"
      className="rounded-md border p-4"
      style={{
        backgroundColor: "var(--color-panel-raised)",
        borderColor: "var(--color-border)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <h2 className="text-xs uppercase tracking-wide mb-3" style={{ color: "var(--color-text-muted)" }}>
        Controls
      </h2>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={driverStatus === "driving" ? onPauseDrive : onResumeDrive}
          disabled={isLoading || driverStatus === "idle"}
          className="text-sm font-medium rounded-sm px-3 py-2 transition-colors
             bg-[var(--color-driver)] text-[var(--color-bg)]
             hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {driverStatus === "paused" ? "Resume" : "Pause"}
        </button>

        <button
          type="button"
          onClick={onChangeDestination}
          disabled={driverStatus === "idle"}
          className="text-sm font-medium rounded-sm px-3 py-2 transition-colors border
             border-[var(--color-deviation)] text-[var(--color-deviation)]
             hover:bg-[var(--color-deviation)] hover:text-[var(--color-bg)]
             disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? "Recalculating..." : "Change Destination"}
        </button>

        <button
          type="button"
          onClick={onRunSimulation}
          disabled={isLoading || driverStatus !== "idle"}
          className="cursor-pointer text-sm font-medium rounded-sm px-3 py-2 transition-colors border
             border-[var(--color-text-muted)] text-[var(--color-text-muted)]
             hover:border-[var(--color-text)] hover:text-[var(--color-text)]
             disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Run Simulation
        </button>
      </div>
    </section>
  );
}

export default memo(ControlPanel)