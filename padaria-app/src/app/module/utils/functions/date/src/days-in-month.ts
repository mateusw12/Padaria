import { chain } from './chain';

export function daysInMonth(source?: Date): number {
  return chain(source).daysInMonth();
}
