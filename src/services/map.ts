import { Map } from "../models/map"

export const findMapContainingCoordinates = async (userLatLong: [number, number]) => {
  const maps = await Map.find();

  for (let i = 0; i < maps.length; i++) {
    if (isPointInPolygon(userLatLong, maps[i].latitude_longitude)) {
      return maps[i]._id;
    }
  }
}


function isPointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}
