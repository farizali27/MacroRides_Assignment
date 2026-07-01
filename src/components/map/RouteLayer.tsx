import type { PathOptions } from 'leaflet';
import type { LatLng } from '../../types/geo'
import { Pane, Polyline } from 'react-leaflet'

interface RouteLayerProps {
  path: LatLng[]
}

export default function RouteLayer({ path }: RouteLayerProps) {
  const routePathOptions: PathOptions = {
    color: 'var(--color-route)',   // or a direct hex if you haven't defined this token yet
    weight: 5,
    opacity: 0.85,
    lineCap: 'round',
    lineJoin: 'round',
  };
  return (
    <Pane name="route-pane" style={{ zIndex: 450 }}>
      <Polyline positions={path} pathOptions={routePathOptions} />
    </Pane>
  )
}

