import { Enum, EnumMap, isString, Nilable, Nullable } from "@module/utils/internal";

export function tryGetName<T>(enumeration: Enum<T>, value: Nilable<number>): Nullable<string> {
  if (!isFinite(value as number)) return null;
  const name = (enumeration as EnumMap)[value as number];
  return isString(name) ? name : null;
}
