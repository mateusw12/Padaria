import { chain } from './chain';

export function addMonths(source: Date, value: number): Date {
  return chain(source).add(value, 'month').toDate();
}
