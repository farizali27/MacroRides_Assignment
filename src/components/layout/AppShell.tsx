import type { ReactNode } from "react";

export interface AppShellProps {
  sidebar: ReactNode;
  map: ReactNode;
}

export default function AppShell({ sidebar, map }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">{sidebar}</aside>
      <main className="app-map-area">{map}</main>
    </div>
  );
}
