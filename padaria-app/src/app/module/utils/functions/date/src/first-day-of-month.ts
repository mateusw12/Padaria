import { chain } from './chain';

export function firstDayOfMonth(source?: Date): Date {
  return chain(source).startOf('month').toDate();
}
