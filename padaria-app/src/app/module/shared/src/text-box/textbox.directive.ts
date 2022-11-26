import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { untilDestroyed } from '@module/utils/common';
import { lowerCase } from '@module/utils/functions/string/lower-case';
import { titleCase } from '@module/utils/functions/string/title-case';
import { ChangedEventArgs, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { from, ObservableInput } from 'rxjs';
import { TextBoxBase } from './textboxbase';

export type CharacterCasing = 'Normal' | 'Lower' | 'Upper' | 'Title';

@Directive({
  selector: 'ejs-textbox'
})
export class TextBoxDirective extends TextBoxBase implements OnInit, OnDestroy {

  constructor(
    private component: TextBoxComponent,
    elementRef: ElementRef<HTMLElement>,
    renderer: Renderer2
  ) {
    super(elementRef, renderer);
    component.floatLabelType = 'Auto';
    component.autocomplete = 'off';
    elementRef.nativeElement.setAttribute('autocapitalize', 'false');
  }

  @Input()
  characterCasing: CharacterCasing = 'Normal';

  ngOnInit(): void {
    from((this.component.change as ObservableInput<ChangedEventArgs>))
      .pipe(untilDestroyed(this))
      .subscribe(this.onChange.bind(this));
  }

  ngOnDestroy(): void { }

  private getCharacterCasing(value: string): string {
    switch (this.characterCasing) {
      case 'Lower': return lowerCase(value);
      case 'Title': return titleCase(value);
      default: return value;
    }
  }

  private onChange(event: ChangedEventArgs): void {
    if (!event.value) return;
    const value = this.getCharacterCasing(event.value);
    if (value !== event.value) {
      event.value = value;
      this.component.value = value;
    }
  }

}
