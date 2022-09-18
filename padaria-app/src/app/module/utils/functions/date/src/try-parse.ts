import { Nilable, Nullable, isNil } from '@module/utils/internal';
import { MomentFormatSpecification, MomentInput } from 'moment';
import { chain } from './chain';

export function tryParse(source: Nilable<MomentInput>, format?: MomentFormatSpecification, strict?: boolean): Nullable<Date> {
  if (isNil(source)) return null;
  const date = chain(source, format, strict);
  return date.isValid() ? date.toDate() : null;
}
