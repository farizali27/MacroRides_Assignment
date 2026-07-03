// scripts/generatePickupPoints.ts

import fs from "node:fs/promises";
import { cellToLatLng, latLngToCell } from "h3-js";
import type { H3Index, LatLng } from "../src/types/geo"
import type { OsrmRouteResponse } from "../src/types/route"
import { fetchOsrmRoute } from "../src/utils/fetchOsrmRoute"
import { generateH3Corridor } from "../src/utils/generateH3Corridor"
import type { PickupPoint } from "../src/types/pickup";

const H3_RESOLUTION = 10;

const CORRIDOR_POINTS = 20;
const NON_CORRIDOR_POINTS = 10;

const sourceDestinationPoints: LatLng[] = [
    { lat: 28.62769919667135, lng: 77.21596579195723 },
    { lat: 28.5900130311213, lng: 77.24734583598209 },
    { lat: 28.577119072479668, lng: 77.2409856900976 },
    { lat: 28.603132306592144, lng: 77.20933890662363 },
    { lat: 28.576122667785874, lng: 77.196668501048 },
    { lat: 28.64153504718349, lng: 77.29009580463914 },
];

function randomChoice<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function random(min: number, max: number) {
    return min + Math.random() * (max - min);
}

function jitter(lat: number, lng: number): LatLng {
    return {
        lat: lat + random(-0.00025, 0.00025),
        lng: lng + random(-0.00025, 0.00025),
    };
}

async function buildUnionCorridor() {
    const union = new Set<string>();

    for (let i = 0; i < sourceDestinationPoints.length; i++) {

        // j = i + 1 avoids duplicate reverse routes
        for (let j = i + 1; j < sourceDestinationPoints.length; j++) {

            const source = sourceDestinationPoints[i];
            const destination = sourceDestinationPoints[j];

            console.log(
                `Generating route ${i + 1}-${j + 1}...`
            );

            const osrmURL =
                `http://router.project-osrm.org/route/v1/driving/` +
                `${source.lng},${source.lat};` +
                `${destination.lng},${destination.lat}` +
                `?overview=full&geometries=geojson`;

            const response =
                await fetchOsrmRoute<OsrmRouteResponse>(osrmURL);

            const path: LatLng[] =
                response.routes[0].geometry.coordinates.map(
                    ([lng, lat]) => ({
                        lat,
                        lng,
                    })
                );

            const corridor = generateH3Corridor(path);

            for (const cell of corridor) {
                union.add(cell);
            }

            // be nice to the public OSRM server
            await new Promise(resolve =>
                setTimeout(resolve, 200)
            );
        }
    }

    return union;
}

async function main() {

    const corridorUnion = await buildUnionCorridor();

    console.log(
        `Union contains ${corridorUnion.size} H3 cells`
    );

    const pickupPoints: PickupPoint[] = [];

    const corridorCells = [...corridorUnion];

    //
    // Corridor pickup points
    //
    const usedCells = new Set<H3Index>();

while (usedCells.size < CORRIDOR_POINTS) {
    const cell = randomChoice(corridorCells);

    if (usedCells.has(cell)) continue;

    usedCells.add(cell);

    const [lat, lng] = cellToLatLng(cell);

    pickupPoints.push({
        id: `pickup-${pickupPoints.length + 1}`,
        label: `P${pickupPoints.length + 1}`,
        position: jitter(lat, lng),
        isEligible: false,
    });
}

    //
    // Bounding box
    //
    const lats = sourceDestinationPoints.map(p => p.lat);
    const lngs = sourceDestinationPoints.map(p => p.lng);

    const minLat = Math.min(...lats) - 0.01;
    const maxLat = Math.max(...lats) + 0.01;

    const minLng = Math.min(...lngs) - 0.01;
    const maxLng = Math.max(...lngs) + 0.01;

    //
    // Outside-corridor pickup points
    //
    while (
        pickupPoints.length <
        CORRIDOR_POINTS + NON_CORRIDOR_POINTS
    ) {

        const lat = random(minLat, maxLat);
        const lng = random(minLng, maxLng);

        const cell = latLngToCell(
            lat,
            lng,
            H3_RESOLUTION
        );

        if (corridorUnion.has(cell))
            continue;

        pickupPoints.push({
            id: `pickup-${pickupPoints.length + 1}`,
            label: `P${pickupPoints.length + 1}`,
            position: { lat, lng },
            isEligible: false,
        });
    }

    const output =
`import type { PickupPoint } from "../types";

export const PICKUP_POINTS: PickupPoint[] = ${JSON.stringify(
        pickupPoints,
        null,
        4
    )};
`;

    await fs.writeFile(
        "src/constants/pickups.ts",
        output
    );

    console.log(
        `Generated ${pickupPoints.length} pickup points`
    );
}

main().catch(console.error);