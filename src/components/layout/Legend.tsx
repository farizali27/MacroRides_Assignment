import { memo } from "react";

interface LegendItem {
  label: string;
  shape: "driver" | "line" | "dot" | "area";
  fill?: string;
  stroke?: string;
  radius?: number;
}

const LEGEND_ITEMS: LegendItem[] = [
  {
    label: "Driver",
    shape: "driver",
  },
  {
    label: "Remaining Route",
    shape: "line",
    stroke: "var(--color-route)",
  },
  {
    label: "350m Corridor",
    shape: "area",
    fill: "#60a5fa",
    stroke: "#60a5fa",
  },
  {
    label: "Eligible Pickup",
    shape: "dot",
    fill: "#22c55e",
    stroke: "#16a34a",
    radius: 7,
  },
  {
    label: "Ineligible Pickup",
    shape: "dot",
    fill: "#9ca3af",
    stroke: "#6b7280",
    radius: 5,
  },
];

function LegendSwatch(item: LegendItem) {
  switch (item.shape) {
    case "driver":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            d="M12 2 L22 22 L12 17 L2 22 Z"
            fill="#00c7ff"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      );

    case "line":
      return (
        <span
          aria-hidden
          className="inline-block rounded-full"
          style={{
            width: 20,
            height: 5,
            backgroundColor: item.stroke,
          }}
        />
      );

    case "dot":
      return (
        <span
          aria-hidden
          className="inline-block rounded-full"
          style={{
            width: (item.radius ?? 5) * 2,
            height: (item.radius ?? 5) * 2,
            backgroundColor: item.fill,
            border: `2px solid ${item.stroke}`,
            boxSizing: "border-box",
          }}
        />
      );

    case "area":
      return (
        <span
          aria-hidden
          className="inline-block"
          style={{
            width: 18,
            height: 14,
            backgroundColor: item.fill,
            border: `1px solid ${item.stroke}`,
            opacity: 0.15,
            boxSizing: "border-box",
          }}
        />
      );
  }
}

function Legend() {
  return (
    <section
      aria-label="Map legend"
      className="rounded-md border p-4"
      style={{
        backgroundColor: "var(--color-panel-raised)",
        borderColor: "var(--color-border)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <h2
        className="mb-3 text-xs uppercase tracking-wide"
        style={{ color: "var(--color-text-muted)" }}
      >
        Legend
      </h2>

      <ul className="flex flex-col gap-3">
        {LEGEND_ITEMS.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 text-sm"
          >
            <LegendSwatch {...item} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(Legend);