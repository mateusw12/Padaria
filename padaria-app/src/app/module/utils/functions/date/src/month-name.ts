import { titleCase } from '@movtech/menu/utils/string';
import { format } from './format';

export function monthName(source?: Date): string {
  return titleCase(format(source, 'MMMM'));
}
