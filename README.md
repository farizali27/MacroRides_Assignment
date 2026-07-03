# Dynamic Route Corridor Visualization

A web application that visualizes a driver's live route, dynamically maintains a route corridor using **H3 spatial indexing**, and continuously updates eligible pickup points in real time.

The application simulates a moving driver, generates a dynamic corridor around the remaining route, and demonstrates efficient spatial querying using H3 while maintaining smooth interactive visualization with Leaflet.

---

## Demo Features

-  Live driver simulation along an OSRM driving route
-  Pause and resume simulation at any time
-  Change destination while driving
-  Direction-aware rerouting using the driver's current bearing
- ️ Route trimming as completed segments are removed
-  Dynamic H3 corridor generation
-  Corridor continuously shrinks as the driver progresses
-  Real-time pickup eligibility updates
-  Driver-following camera
-  Live status dashboard displaying:
    - Driver state
    - Current coordinates
    - Remaining distance
    - Eligible pickup count
- ️ Interactive legend explaining all map layers

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Leaflet
- React Leaflet
- H3-js
- Tailwind CSS v4

---

## Project Structure

```
src
├── components
│   ├── layout
│   │   ├── ControlPanel.tsx
│   │   ├── Legend.tsx
│   │   └── StatusBar.tsx
│   │
│   └── map
│       ├── DriverLayer.tsx
│       ├── RouteLayer.tsx
│       ├── CorridorLayer.tsx
│       ├── PickupLayer.tsx
│       └── CameraController.tsx
│
├── hooks
│   ├── useDriverSimulation.ts
│   ├── useH3Corridor.ts
│   └── useSetPickupPoints.ts
│
├── utils
│   ├── fetchOsrmRoute.ts
│   ├── routeInterpolation.ts
│   ├── generateH3Corridor.ts
│   ├── getCachedBoundary.ts
│   ├── bearing.ts
│   └── geometry.ts
│
├── constants
├── types
└── assets

scripts
└── generatePickupPoints.ts
```

---
# Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# Architecture

The application is divided into four logical layers:

### Presentation Layer

Responsible for rendering:

- Leaflet map
- Driver marker
- Route polyline
- H3 corridor polygons
- Pickup markers
- Dashboard and controls

---

### Simulation Layer

Handles:

- Driver movement
- Pause/Resume state
- Route trimming
- Distance travelled
- Simulation timing

---

### Spatial Layer

Responsible for:

- H3 corridor generation
- Corridor shrinking
- Pickup eligibility
- Polygon boundary caching

---

### Utility Layer

Contains reusable helpers for:

- OSRM routing
- Bearing calculation
- Route interpolation
- Geometry calculations

---

# How It Works

## 1. Route Generation

A random source and destination are selected from predefined locations.

The route is fetched from the public **OSRM Routing API**, decoded into latitude-longitude coordinates and stored as the master route.

This route is then used by every subsystem:

- driver simulation
- H3 corridor generation
- route rendering
- pickup eligibility

---

## 2. Driver Simulation

Rather than jumping between OSRM coordinates, the driver moves continuously using interpolation.

The simulation maintains:

- current position
- previous position
- cumulative distance travelled
- current route index
- remaining distance
- simulation state

Movement occurs at a fixed speed every simulation tick, producing smooth animation independent of the spacing of OSRM geometry points.

---

## 3. Pause & Resume

The simulation can be paused at any point.

Pausing simply stops the simulation timer while preserving all simulation state, including:

- current driver position
- travelled distance
- remaining route
- active H3 corridor
- eligible pickup points

Resuming continues exactly where the driver stopped without recomputing the route.

---

## 4. Changing Destination

The destination can be changed while the driver is already en route.

Instead of restarting the trip, the driver's **current location becomes the new source** and a new random destination is selected.

To avoid unrealistic U-turns, the application computes the driver's current heading using the previous and current coordinates.

The calculated bearing is passed to the OSRM Routing API through the `bearings` parameter:

```
bearing=currentBearing,20
```

The second value specifies a tolerance of ±20°, instructing OSRM to begin the new route in approximately the same direction the driver is already travelling.

This produces natural rerouting behaviour that preserves forward motion instead of immediately reversing direction.

Once the new route is received:

- the displayed route is replaced
- cumulative distances are recomputed
- the H3 corridor is regenerated
- eligible pickup points are updated automatically

---

## 5. Route Trimming

As the driver moves forward, travelled route segments are continuously removed.

Instead of rendering the entire polyline throughout the trip, only the remaining route is displayed.

This creates the visual effect of the route shrinking behind the moving driver while reducing unnecessary rendering.

---

## 6. H3 Corridor Generation

Each route coordinate is converted into an H3 cell at **resolution 10**.

For every route cell, an H3 `gridDisk` with **k = 3** is generated.

This produces a corridor of width 390m on either side of the road that closely matches the required **350 m buffer** while remaining computationally efficient.

Rather than rebuilding the corridor every simulation tick, the application stores the **last route index** at which every H3 cell appears.

During rendering:

- cells ahead of the driver remain visible
- cells already passed are discarded

As a result, the corridor naturally shrinks as the driver progresses without recomputing thousands of H3 cells.

---

## Why Resolution 10?

Resolution 10 provides an excellent balance between:

- spatial accuracy
- smooth corridor boundaries
- rendering performance
- memory usage

Lower resolutions create corridors that are too coarse, while higher resolutions significantly increase the number of rendered cells without noticeable visual improvement.

---

## Why `k = 3`?

An H3 cell at resolution 10 has an average edge length of approximately **15 m**.

Using a neighborhood radius of **3** generates sufficient overlap between adjacent route cells, producing an effective corridor approximately **350–400 m** wide around the route.

This closely satisfies the assignment requirement while avoiding unnecessary expansion.

---

## 7. Pickup Eligibility

Each pickup point is converted into its H3 index once during initialization.

A pickup is considered eligible whenever its H3 cell exists in the active corridor.

This makes eligibility checking extremely efficient:

```
Pickup H3 Index
        │
        ▼
Is H3 Cell in Active Corridor?
        │
   Yes ─────► Eligible
        │
    No ─────► Not Eligible
```

Eligibility is recomputed only when the active corridor changes.

---

## 8. Boundary Caching

Rendering H3 polygons requires repeatedly computing polygon boundaries.

Since many cells persist across renders, recalculating identical boundaries would be wasteful.

The application caches every computed boundary the first time it is requested.

Subsequent renders simply reuse the cached polygon, eliminating thousands of unnecessary geometry calculations.

---

# Performance Optimizations

Several optimizations were implemented to keep the visualization responsive despite continuous simulation updates.

### Route Interpolation

Cumulative route distances are precomputed once, allowing the driver's position to be determined without repeatedly traversing the route.

---

### Incremental Corridor Shrinking

The H3 corridor is generated only when a new route is created.

During simulation, shrinking is performed by filtering existing cells rather than rebuilding the corridor.

---

### Cached H3 Boundaries

Polygon boundaries are cached after their first computation to eliminate repeated H3 geometry generation.

---

### Memoized Computations

Expensive spatial computations use `useMemo` to avoid unnecessary recalculation.

---

### Component Memoization

Map layers are wrapped with `React.memo` to minimize React and Leaflet re-rendering.

---

# Pickup Point Generator

The repository includes a standalone helper script for generating realistic pickup datasets.

The script:

- fetches a random OSRM route
- generates its H3 corridor
- randomly creates pickup points both inside and outside the corridor
- labels pickup eligibility
- exports the generated dataset for use by the application

Run:

```bash
npm run generate:pickups
```

---
