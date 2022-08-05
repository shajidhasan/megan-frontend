import type { Point } from "../types";

export const getCoordinates = async (location: string): Promise<Point> => {
  const response = await fetch(`https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(location)}&key=4e0f2a05-4103-46d4-af16-5b759f7b58b6`)
  const json = await response.json()

  return json.hits[0].point as Point
}