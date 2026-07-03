import { CircleMarker, Popup } from 'react-leaflet'
import type { PickupPoint } from '../../types/pickup';
import type { PathOptions } from 'leaflet';

interface RouteLayerProps {
  pickupPoints: PickupPoint[]
}

export default function PickupPointsLayer({ pickupPoints }: RouteLayerProps) {
  const greenOption: PathOptions = {
  color: '#16a34a',      // Border
  fillColor: '#22c55e',  // Fill
  fillOpacity: 0.8,
  weight: 2,
}

const greyOption: PathOptions = {
  color: '#6b7280',      // Border
  fillColor: '#9ca3af',  // Fill
  fillOpacity: 0.7,
  weight: 2,
}
  return (
    <>
      {pickupPoints.map(point => (
        <CircleMarker
          key={point.id}
          center={[point.position.lat, point.position.lng]}
          radius={point.isEligible ? 7 : 5}
          pathOptions={point.isEligible ? greenOption : greyOption}
        >
          <Popup>{point.label}</Popup>
        </CircleMarker>
      ))}
    </>
  )
}

