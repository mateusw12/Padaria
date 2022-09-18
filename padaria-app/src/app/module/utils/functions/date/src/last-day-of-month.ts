import { chain } from './chain';

export function lastDayOfMonth(source?: Date): Date {
  return chain(source).endOf('month').toDate();
}
