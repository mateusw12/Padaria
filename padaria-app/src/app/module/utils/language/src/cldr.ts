import {
  L10n,
  loadCldr,
  setCulture,
  setCurrencyCode,
} from '@syncfusion/ej2-base';
import * as language from '@syncfusion/ej2-locale/src/pt-BR.json';
import * as cagregorian from 'cldr-data/main/pt/ca-gregorian.json';
import * as currencies from 'cldr-data/main/pt/currencies.json';
import * as numbers from 'cldr-data/main/pt/numbers.json';
import * as timeZoneNames from 'cldr-data/main/pt/timeZoneNames.json';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';

loadCldr(currencies, cagregorian, numbers, timeZoneNames, numberingSystems);
setCulture('pt');
setCurrencyCode('BRL');

L10n.load(language);
