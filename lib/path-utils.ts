export type PathKey = string | number

/** Immutably sets a nested value at `path` inside `obj`, cloning only the touched branch. */
export function setPath<T>(obj: T, path: PathKey[], value: unknown): T {
  if (path.length === 0) return value as T
  const [key, ...rest] = path
  if (Array.isArray(obj)) {
    const copy = obj.slice()
    copy[key as number] = setPath(obj[key as number], rest, value)
    return copy as unknown as T
  }
  const source = (obj ?? {}) as Record<string, unknown>
  return { ...source, [key]: setPath(source[key as string], rest, value) } as T
}

export function getPath(obj: unknown, path: PathKey[]): any {
  return path.reduce<any>((acc, key) => (acc == null ? acc : acc[key]), obj)
}
