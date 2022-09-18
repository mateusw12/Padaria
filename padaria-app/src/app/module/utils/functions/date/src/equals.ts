import { isNil, Nilable } from '@module/utils/internal';
import { chain } from './chain';

export function equals(a: Nilable<Date>, b: Nilable<Date>): boolean {
  const aIsNil = isNil(a);
  const bIsNil = isNil(b);
  if (aIsNil || bIsNil) return aIsNil && bIsNil;
  return chain(a).isSame(b as Date);
}
