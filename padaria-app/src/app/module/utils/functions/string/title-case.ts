import { Nilable } from '@module/utils/internal';
import { lowerCase } from './lower-case';

export function titleCase(value: Nilable<string>): string {
  return lowerCase(value).replace(/(?:^|\s|-)\S/g, c => c.toUpperCase());
}
