import type { ReactNode } from "react";

export interface AppShellProps {
  sidebar: ReactNode;
  map: ReactNode;
}

/**
 * Pure layout wrapper — sidebar on the left, map filling the rest.
 * Grid behavior (including the mobile stack) lives in App.css under
 * .app-shell / .app-sidebar / .app-map-area.
 */
export default function AppShell({ sidebar, map }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">{sidebar}</aside>
      <main className="app-map-area">{map}</main>
    </div>
  );
}
