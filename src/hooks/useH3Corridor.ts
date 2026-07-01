import { useMemo } from "react";
import type { LatLng } from "../types/geo";
import { generateH3Corridor } from "../utils/generateH3Corridor";

export function useH3Corridor(path: LatLng[]) {
    return useMemo(
        () => generateH3Corridor(path),
        [path]
    );
}