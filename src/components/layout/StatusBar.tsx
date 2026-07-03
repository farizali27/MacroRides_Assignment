import type { DriverSimulationStatus } from "../../types/simulation";
import type { LatLng } from "../../types/geo";

export interface StatusBarProps {
  routeStatus: "idle" | "loading" | "ready" | "error";
  driverStatus: DriverSimulationStatus;
  driverPosition: LatLng | null;
  eligibleCount: number;
  totalPickupCount: number;
  totalDistanceMeters: number | null;
  remainingDistanceMeters: number | null;
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

export default function StatusBar({
  routeStatus,
  driverStatus,
  driverPosition,
  eligibleCount,
  totalPickupCount,
  totalDistanceMeters,
  remainingDistanceMeters,
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
        {routeStatus === "loading" ? (
          <span
            className="text-xs font-medium uppercase tracking-wide animate-pulse"
            style={{ color: "var(--color-accent)" }}
          >
            ● Recalculating…
          </span>
        ) : routeStatus === "error" ? (
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: "var(--color-danger)" }}
          >
            ● Route Error
          </span>
        ) : (
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: STATUS_COLOR_VAR[driverStatus] }}
          >
            ● {STATUS_LABEL[driverStatus]}
          </span>
        )}
      </header>

      {routeStatus === "error" && (
        <p
          className="text-xs mb-3 p-2 rounded"
          style={{
            color: "var(--color-danger)",
            backgroundColor: "rgba(239,68,68,0.08)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          Failed to fetch route. Check connection and try again.
        </p>
      )}

      <dl className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
        <dt style={{ color: "var(--color-text-muted)" }}>Lat</dt>
        <dd className="text-right">
          {driverPosition ? formatCoordinate(driverPosition.lat) : "—"}
        </dd>

        <dt style={{ color: "var(--color-text-muted)" }}>Lng</dt>
        <dd className="text-right">
          {driverPosition ? formatCoordinate(driverPosition.lng) : "—"}
        </dd>

        <dt style={{ color: "var(--color-text-muted)" }}>Total dist.</dt>
        <dd className="text-right">{formatDistance(totalDistanceMeters)}</dd>

        <dt style={{ color: "var(--color-text-muted)" }}>Remaining</dt>
        <dd className="text-right">{formatDistance(remainingDistanceMeters)}</dd>

        <dt style={{ color: "var(--color-text-muted)" }}>Eligible pickups</dt>
        <dd className="text-right">
          {eligibleCount} / {totalPickupCount}
        </dd>
      </dl>
    </section>
  );
}