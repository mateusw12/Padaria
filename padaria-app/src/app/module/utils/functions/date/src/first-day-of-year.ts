import { chain } from './chain';

export function firstDayOfYear(source?: Date): Date {
  return chain(source).startOf('year').toDate();
}
