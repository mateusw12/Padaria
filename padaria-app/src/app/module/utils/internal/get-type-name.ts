import { Class } from './interfaces';
import { isNil } from './is-nil';

export function getTypeName(type: Class<unknown>): string {
  if (isNil(type)) return `${type}`;
  if (type.name) return `${type.name}`;
  const name = type.toString();
  if (isNil(name)) return `${name}`;
  const match = /function\s(\w+)/.exec(name);
  return match ? match[1] : name;
}
