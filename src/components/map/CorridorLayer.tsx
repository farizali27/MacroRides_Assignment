import type { PathOptions } from 'leaflet';
import type { LatLng } from '../../types/geo'
import { Pane, Polygon, Polyline } from 'react-leaflet'
import { useH3Corridor } from '../../hooks/useH3Corridor';
import { cellBoundaryToLatLngs } from '../../utils/convertFormat';

interface RouteLayerProps {
  path: LatLng[]
}

export default function CorridorLayer({ path }: RouteLayerProps) {
  const corridorCells = useH3Corridor(path)
  const corridorStyle: L.PathOptions = {
    color: '#60a5fa',   // stroke
    fillColor: '#60a5fa',   // fill
    fillOpacity: 0.15,
    weight: 0.8,
    opacity: 0.5,
  };
  return (
    <>
      {[...corridorCells].map(cellIndex => (
        <Polygon
          key={cellIndex}
          positions={cellBoundaryToLatLngs(cellIndex)}
          pathOptions={corridorStyle}
        />
      ))}
    </>
  )
}

