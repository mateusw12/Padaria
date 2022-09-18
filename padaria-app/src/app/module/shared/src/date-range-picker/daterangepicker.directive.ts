import { Directive } from '@angular/core';
import { chain, getDateFormat } from '@module/utils/functions/date';
import { isString } from '@module/utils/internal';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { getMomentFormat } from '../base/cldr-utils';

interface SfDateRangePickerComponent {
  inputElement: HTMLInputElement;
  isPopupOpen(): boolean;
  inputHandler(event: KeyboardEventArgs): void;
  inputBlurHandler(event: MouseEvent | KeyboardEvent): void;
}

@Directive({
  selector: 'ejs-daterangepicker'
})
export class DateRangePickerDirective {

  private get host(): SfDateRangePickerComponent {
    return this.component as unknown as SfDateRangePickerComponent;
  }

  constructor(private component: DateRangePickerComponent) {
    this.component.floatLabelType = 'Auto';
    this.component.strictMode = true;
    this.component.openOnFocus = true;
    this.initAutoComplete();
  }

  private inputBlurHandler(): void {
    if (!this.host.inputElement.value) return;
    const parts = this.host.inputElement.value.split(' ', 2);
    if (parts.length === 1) parts.push(parts[0]);
    const format = this.getFormat();
    const dates = parts.map(part => chain(part, format));
    if (!dates.every(date => date.isValid())) return;
    const value = dates.map(date => date.format(format)).join(' - ');
    this.host.inputElement.value = value;
  }

  private inputHadler(event: KeyboardEventArgs): void {
    if (event.action === 'tab' && this.host.isPopupOpen()) {
      this.component.hide(event);
    }
  }

  private initAutoComplete(): void {
    const inputHandler = this.host.inputHandler;
    const inputBlurHandler = this.host.inputBlurHandler;
    this.host.inputHandler = event => {
      this.inputHadler(event);
      inputHandler.call(this.host, event);
    };
    this.host.inputBlurHandler = event => {
      this.inputBlurHandler();
      inputBlurHandler.call(this.host, event);
    };
  }

  private getFormat(): string {
    if (isString(this.component.format)) {
      return getMomentFormat(this.component.format);
    }
    return getDateFormat();
  }

}
