import { Component, Input } from '@angular/core';

export interface FormErrorControl {
  message: string;
}

@Component({
  selector: 'form-error',
  template: `<label class="e-error" [title]="message">{{ message }}</label>`,
  styles: [`
    label {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `]
})
export class FormErrorComponent implements FormErrorControl {

  constructor() { }

  @Input()
  message: string = '';

}
