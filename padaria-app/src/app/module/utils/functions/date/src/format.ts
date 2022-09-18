import { Nilable } from '@movtech/menu/internal';
import { chain } from './chain';
import { isValid } from './is-valid';

export function format(source: Nilable<Date>, pattern: string): string {
  if (!isValid(source)) return '';
  return chain(source).format(pattern);
}
