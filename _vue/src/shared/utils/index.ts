export function objectsArrFromMap(map: Map<string, any>): Object[] {
  return Array.from(map, ([mKey, mVal]) => ({ mKey, mVal }))
}
