import { chain } from './chain';

export function addYears(source: Date, value: number): Date {
  return chain(source).add(value, 'year').toDate();
}
