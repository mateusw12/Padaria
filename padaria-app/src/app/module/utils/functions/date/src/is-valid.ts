import { isFinite } from '@movtech/menu/utils/number';

export function isValid(value: unknown): value is Date {
  return value instanceof Date && isFinite(value.getTime());
}
