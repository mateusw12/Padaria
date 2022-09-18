import { chain } from './chain';

export function getTimeFormat(): string {
  return chain().localeData().longDateFormat('LT');
}
