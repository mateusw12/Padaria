export function isObject<T = object>(value: unknown): value is T {
  return value !== null && typeof value === 'object';
}
