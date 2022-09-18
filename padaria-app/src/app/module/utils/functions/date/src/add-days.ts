import { chain } from './chain';

export function addDays(source: Date, value: number): Date {
  return chain(source).add(value, 'day').toDate();
}
