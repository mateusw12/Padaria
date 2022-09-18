import { chain } from './chain';

export function today(): Date {
  return chain().startOf('day').toDate();
}
