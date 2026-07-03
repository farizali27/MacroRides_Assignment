import { Marker } from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "../../types/geo";

interface Props {
  position: LatLng;
  bearing: number;
}

export default function DriverMarker({
  position,
  bearing,
}: Props) {

  const icon = L.divIcon({
    className: "",
    html: `
    <div
      style="
        transform: rotate(${bearing}deg);
        width: 26px;
        height: 26px;
      "
    >
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
      >
        <path
          d="M12 2 L22 22 L12 17 L2 22 Z"
          fill="#00c7ff"
          stroke="white"
          stroke-width="2"
        />
      </svg>
    </div>
  `,
  });

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={icon}
    />
  );
}