import type { PathOptions } from 'leaflet';
import type { LatLng } from '../../types/geo'
import { Pane, Polyline } from 'react-leaflet'

interface RouteLayerProps {
  path: LatLng[];
  sliceIndex: number;
  position: LatLng | null;
}

export default function RouteLayer({ position, path, sliceIndex }: RouteLayerProps) {
  if(!position) return null

  const slicedPath = [position, ...path.slice(sliceIndex)]
  const routePathOptions: PathOptions = {
    color: 'var(--color-route)',   // or a direct hex if you haven't defined this token yet
    weight: 5,
    opacity: 0.85,
    lineCap: 'round',
    lineJoin: 'round',
  };
  return (
    <Pane name="route-pane" style={{ zIndex: 450 }}>
      <Polyline positions={slicedPath} pathOptions={routePathOptions} />
    </Pane>
  )
}

