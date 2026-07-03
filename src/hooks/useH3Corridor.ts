import { useMemo } from "react";
import type { H3Index, LatLng } from "../types/geo";
import { generateH3Corridor } from "../utils/generateH3Corridor";

export function useH3Corridor(path: LatLng[], driverIndex: number) {
    const activeCells = useMemo(() => {
        const cellLastSeen = generateH3Corridor(path)
        const result = new Set<H3Index>
        for (const [cell, lastSeen] of cellLastSeen) {
            if (lastSeen >= driverIndex)
                result.add(cell)
        }
        return result
    }, [path, driverIndex]
    )
    return activeCells
}