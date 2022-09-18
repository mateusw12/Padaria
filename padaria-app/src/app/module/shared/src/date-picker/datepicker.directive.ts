import { Directive } from '@angular/core';
import { chain, getDateFormat } from '@module/utils/functions/date';
import { isString } from '@module/utils/internal';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { getMomentFormat } from '../base/cldr-utils';

interface SfDatePickerComponent {
  inputElement: HTMLInputElement;
  strictModeUpdate: () => void;
}

@Directive({
  selector: 'ejs-datepicker'
})
export class DatePickerDirective {

  private get host(): SfDatePickerComponent {
    return this.component as unknown as SfDatePickerComponent;
  }

  constructor(private component: DatePickerComponent) {
    this.component.floatLabelType = 'Auto';
    this.component.strictMode = true;
    this.component.openOnFocus = true;
    this.initAutoComplete();
  }

  private strictModeUpdate(): void {
    if (!this.host.inputElement.value) return;
    const format = this.getFormat();
    const date = chain(this.host.inputElement.value, format);
    if (!date.isValid()) return;
    this.host.inputElement.value = date.format(format);
  }

  private initAutoComplete(): void {
    const strictModeUpdate = this.host.strictModeUpdate;
    this.host.strictModeUpdate = () => {
      this.strictModeUpdate();
      strictModeUpdate.call(this.host);
    };
  }

  private getFormat(): string {
    if (isString(this.component.format)) {
      return getMomentFormat(this.component.format);
    }
    return getDateFormat();
  }

}
