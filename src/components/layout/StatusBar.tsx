import type { DriverSimulationStatus } from "../../types/simulation";
import type { LatLng } from "../../types/geo";

export interface StatusBarProps {
  /** Current high-level state of the driver simulation. */
  driverStatus: DriverSimulationStatus;
  /** Driver's current position, or null before simulation starts. */
  driverPosition: LatLng | null;
  /** Count of pickup points currently inside the corridor. */
  eligibleCount: number;
  /** Total number of pickup points being tracked. */
  totalPickupCount: number;
  /** Route distance in meters, once OSRM has returned a route. */
  routeDistanceMeters: number | null;
}

const STATUS_LABEL: Record<DriverSimulationStatus, string> = {
  idle: "No Route",
  driving: "Driving",
  paused: "Paused",
};

const STATUS_COLOR_VAR: Record<DriverSimulationStatus, string> = {
  idle: "var(--color-text-muted)",
  driving: "var(--color-driver)",
  paused: "var(--color-text-muted)",
};

function formatCoordinate(value: number): string {
  return value.toFixed(5);
}

function formatDistance(meters: number | null): string {
  if (meters === null) return "—";
  return meters >= 1000 ? `${(meters / 1000).toFixed(2)} km` : `${meters.toFixed(0)} m`;
}

/**
 * Structural shell only — no logic. Wire `driverPosition`, `driverStatus`,
 * and the counts up from your hooks once Phases 3–5 are in place. Every
 * value here is rendered as plain mono-digit text on purpose: this panel
 * is meant to read like a live telemetry readout, not a card.
 */
export default function StatusBar({
  driverStatus,
  driverPosition,
  eligibleCount,
  totalPickupCount,
  routeDistanceMeters,
}: StatusBarProps) {
  return (
    <section
      aria-label="Driver status"
      className="rounded-md border p-4"
      style={{
        backgroundColor: "var(--color-panel-raised)",
        borderColor: "var(--color-border)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
          Status
        </h2>
        <span
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: STATUS_COLOR_VAR[driverStatus] }}
        >
          ● {STATUS_LABEL[driverStatus]}
        </span>
      </header>

      <dl className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
        <dt style={{ color: "var(--color-text-muted)" }}>Lat</dt>
        <dd className="text-right">
          {driverPosition ? formatCoordinate(driverPosition.lat) : "—"}
        </dd>

        <dt style={{ color: "var(--color-text-muted)" }}>Lng</dt>
        <dd className="text-right">
          {driverPosition ? formatCoordinate(driverPosition.lng) : "—"}
        </dd>

        <dt style={{ color: "var(--color-text-muted)" }}>Route dist.</dt>
        <dd className="text-right">{formatDistance(routeDistanceMeters)}</dd>

        <dt style={{ color: "var(--color-text-muted)" }}>Eligible pickups</dt>
        <dd className="text-right">
          {eligibleCount} / {totalPickupCount}
        </dd>
      </dl>
    </section>
  );
}
// add distanceRemaining to the status bar