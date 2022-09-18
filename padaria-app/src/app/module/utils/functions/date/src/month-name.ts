import { titleCase } from '../../string/title-case';
import { format } from './format';

export function monthName(source?: Date): string {
  return titleCase(format(source, 'MMMM'));
}
