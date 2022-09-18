import { Nilable } from '@module/utils/internal';
import * as moment from 'moment';
import { Moment, MomentFormatSpecification, MomentInput } from 'moment';
import 'moment/locale/pt-br';

const $moment = moment;

export function setLocale(language: string): void {
  if ($moment.locale() !== language) {
    $moment.locale(language);
  }
}

export function chain(source?: Nilable<MomentInput>, format?: MomentFormatSpecification, strict?: boolean): Moment {
  return $moment(source as MomentInput, format, strict);
}

setLocale('pt-br');
