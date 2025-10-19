export function objectsArrFromMap(map: Map<string, any>): Object[] {
  return Array.from(map, ([mKey, mVal]) => ({ mKey, mVal }))
}

export function toKebabCase(val: string): string {
  return val
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9\-]/g, '')
    .toLowerCase()
}
