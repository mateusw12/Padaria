import { chain } from './chain';

export function lastDayOfYear(source?: Date): Date {
  return chain(source).endOf('year').toDate();
}
