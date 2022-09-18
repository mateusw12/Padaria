import { chain } from './chain';

export function getDateFormat(): string {
  return chain().localeData().longDateFormat('L');
}
