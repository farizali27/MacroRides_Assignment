import { memo } from "react";
import type { DriverSimulationStatus } from "../../types/simulation";

export interface ControlPanelProps {
  driverStatus: DriverSimulationStatus;
  isRecalculating: boolean;
  onResumeDrive: () => void;
  onPauseDrive: () => void;
  onRunSimulation: () => void;
  onSimulateDeviation: () => void;
}

function ControlPanel({
  driverStatus,
  isRecalculating,
  onResumeDrive,
  onPauseDrive,
  onRunSimulation,
  onSimulateDeviation,
}: ControlPanelProps) {
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
          disabled={isRecalculating || driverStatus === "idle"}
          className="text-sm font-medium rounded-sm px-3 py-2 transition-colors
             bg-[var(--color-driver)] text-[var(--color-bg)]
             hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {driverStatus === "paused" ? "Resume Drive" : "Pause Drive"}
        </button>

        <button
          type="button"
          onClick={onSimulateDeviation}
          disabled={isRecalculating || driverStatus === "idle"}
          className="text-sm font-medium rounded-sm px-3 py-2 transition-colors border
             border-[var(--color-deviation)] text-[var(--color-deviation)]
             hover:bg-[var(--color-deviation)] hover:text-[var(--color-bg)]
             disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Change Destination
        </button>

        <button
          type="button"
          onClick={onRunSimulation}
          disabled={isRecalculating || driverStatus !== "idle"}
          className="cursor-pointer text-sm font-medium rounded-sm px-3 py-2 transition-colors border
             border-[var(--color-text-muted)] text-[var(--color-text-muted)]
             hover:border-[var(--color-text)] hover:text-[var(--color-text)]
             disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Run Simulation
        </button>

        {isRecalculating && (
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }} role="status">
            Recalculating route, corridor, and eligibility…
          </p>
        )}
      </div>
    </section>
  );
}

export default memo(ControlPanel)