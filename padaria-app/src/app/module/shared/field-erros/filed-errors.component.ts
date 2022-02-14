import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  styleUrls: ['field-errors.component.scss'],
  templateUrl: './filed-errors.component.html',
})
export class FieldErrorDisplayComponent {
  @Input()
  errorMsg: string = '';
  @Input()
  displayError: boolean = false;
}
