import { memo } from "react";

interface LegendItem {
  label: string;
  colorVar: string;
  /** "line" for routes, "dot" for points, "area" for the corridor fill. */
  shape: "line" | "dot" | "area";
}

const LEGEND_ITEMS: LegendItem[] = [
  { label: "Driver", colorVar: "var(--color-driver)", shape: "dot" },
  { label: "Route", colorVar: "var(--color-route)", shape: "line" },
  { label: "350m Corridor", colorVar: "var(--color-corridor)", shape: "area" },
  { label: "Eligible pickup", colorVar: "var(--color-eligible)", shape: "dot" },
  { label: "Ineligible pickup", colorVar: "var(--color-ineligible)", shape: "dot" },
];

function LegendSwatch({ colorVar, shape }: Pick<LegendItem, "colorVar" | "shape">) {
  if (shape === "dot") {
    return (
      <span
        aria-hidden
        className="inline-block rounded-full"
        style={{ width: 10, height: 10, backgroundColor: colorVar }}
      />
    );
  }

  if (shape === "line") {
    return (
      <span
        aria-hidden
        className="inline-block rounded-full"
        style={{ width: 16, height: 3, backgroundColor: colorVar }}
      />
    );
  }

  // area
  return (
    <span
      aria-hidden
      className="inline-block rounded-sm"
      style={{ width: 14, height: 10, backgroundColor: colorVar, opacity: 0.35 }}
    />
  );
}

/**
 * Static shell — this list is intentionally hardcoded rather than derived,
 * since the legend describes fixed visual conventions, not live data.
 * If you add new layers/colors later, add an entry here to match.
 */
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
      <h2 className="text-xs uppercase tracking-wide mb-3" style={{ color: "var(--color-text-muted)" }}>
        Legend
      </h2>

      <ul className="flex flex-col gap-2">
        {LEGEND_ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-sm">
            <LegendSwatch colorVar={item.colorVar} shape={item.shape} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(Legend)