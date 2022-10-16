import { Enum, Key, Nilable } from '@module/utils/internal';
import { getDescriptor } from './descriptor';
import { tryGetName } from './try-get-name';

export function getDescription<T>(enumeration: Enum<T>, value: Nilable<number>): string {
  const name = tryGetName(enumeration, value);
  if (!name) return '';
  const descriptor = getDescriptor(enumeration);
  if (!descriptor) return name;
  return descriptor.description[name as Key<T>];
}
