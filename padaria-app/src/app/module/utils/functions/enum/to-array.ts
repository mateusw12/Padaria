import { Enum, EnumMap, isNumber } from '@module/utils/internal';
import { getDescription } from './get-description';
import { EnumItem } from './interfaces';

export function toArray<T>(enumeration: Enum<T>): EnumItem[] {
  const map = enumeration as EnumMap;
  return Object.keys(map)
    .map(name => map[name])
    .filter(value => isNumber(value))
    .map(value => ({
      value: value as number,
      name: map[value] as string,
      description: getDescription(map, value as number)
    }));
}
