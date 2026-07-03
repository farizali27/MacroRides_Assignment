import type { H3Index } from '../../types/geo'
import { Polygon } from 'react-leaflet'
import { getCachedBoundary } from '../../utils/getCachedBoundary';
import { memo } from "react";

interface RouteLayerProps {
  corridorCells: Set<H3Index>
}

function CorridorLayer({ corridorCells }: RouteLayerProps) {
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
          positions={getCachedBoundary(cellIndex)}
          pathOptions={corridorStyle}
        />
      ))}
    </>
  )
}

export default memo(CorridorLayer)

