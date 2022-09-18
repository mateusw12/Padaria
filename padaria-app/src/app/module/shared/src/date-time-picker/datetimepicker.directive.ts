import { Directive } from '@angular/core';
import { chain, getDateFormat, getTimeFormat } from '@module/utils/functions/date';
import { isString } from '@module/utils/internal';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { getMomentFormat } from '../base/cldr-utils';

interface SfDateTimePickerComponent {
  inputElement: HTMLInputElement;
  strictModeUpdate: () => void;
}

const DATETIME_SEPARATOR = ' ';

@Directive({
  selector: 'ejs-datetimepicker'
})
export class DateTimePickerDirective {

  private get host(): SfDateTimePickerComponent {
    return this.component as unknown as SfDateTimePickerComponent;
  }

  constructor(private component: DateTimePickerComponent) {
    this.component.floatLabelType = 'Auto';
    this.component.strictMode = true;
    this.component.openOnFocus = true;
    this.initAutoComplete();
  }

  private strictModeUpdate(): void {
    if (!this.host.inputElement.value) return;
    const parts = this.host.inputElement.value.split(DATETIME_SEPARATOR, 2);
    const values: string[] = [];

    const format = this.getFormat();
    const date = chain(parts[0], format[0]);
    if (!date.isValid()) return;
    values.push(date.format(format[0]));

    if (parts.length === 2 && format.length === 2) {
      const time = chain(parts[1], format[1]);
      if (!time.isValid()) return;
      values.push(time.format(format[1]));
    }

    this.host.inputElement.value = values.join(DATETIME_SEPARATOR);
  }

  private initAutoComplete(): void {
    const strictModeUpdate = this.host.strictModeUpdate;
    this.host.strictModeUpdate = () => {
      this.strictModeUpdate();
      strictModeUpdate.call(this.host);
    };
  }

  private getFormat(): string[] {
    if (isString(this.component.format)) {
      return getMomentFormat(this.component.format).split(DATETIME_SEPARATOR, 2);
    }
    return [getDateFormat(), getTimeFormat()];
  }

}
