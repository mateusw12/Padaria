import { Nilable } from '@module/utils/internal';
import { trim } from './trim';

export function isWhitespaces(value: Nilable<string>): boolean {
  return !trim(value);
}
