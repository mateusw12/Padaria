
import { Directive, Injectable, Injector, Renderer2 } from '@angular/core';
import { OnPropertyChange } from '@module/utils/common';
import { ObjectValue } from '@module/utils/internal';
import { ButtonComponent, ButtonModel, IconPosition } from '@syncfusion/ej2-angular-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { Subscribable } from 'rxjs';

type AfterContentChecked = import('@angular/core').AfterContentChecked;
type AfterViewInit = import('@angular/core').AfterViewInit;
type OnDestroy = import('@angular/core').OnDestroy;
type OnInit = import('@angular/core').OnInit;
type Type<T> = import('@angular/core').Type<T>;

const inheritedInputs = [
  'content', 'cssClass', 'disabled', 'enablePersistence',
  'enableRtl', 'iconCss', 'iconPosition', 'isPrimary',
  'isToggle', 'locale'
];

const inheritedOutputs = ['created'];

const inputs = [...inheritedInputs, 'width', 'height', 'iconOnly'];

const outputs = [...inheritedOutputs];

export function Button(selector: string): ClassDecorator {
  return Directive({
    selector,
    inputs,
    outputs,
    providers: [ButtonComponent],
    host: {
      '[style.width]': 'width',
      '[style.height]': 'height',
      '[class.btn-icon]': 'iconOnly'
    }
  });
}

@Injectable()
export abstract class ButtonBase
  implements ButtonModel, OnInit, OnDestroy, AfterViewInit, AfterContentChecked
{
  private buttonComponent: ButtonComponent;
  private renderer: Renderer2;

  iconPosition!: IconPosition;
  iconCss!: string;
  disabled!: boolean;
  isPrimary!: boolean;
  cssClass!: string;
  content!: string;
  isToggle!: boolean;
  enablePersistence!: boolean;
  enableRtl!: boolean;
  locale!: string;
  created!: EmitType<Event>;
  width?: string;
  height?: string;
  iconOnly: boolean = false;

  constructor(injector: Injector) {
    this.buttonComponent = injector.get(
      ButtonComponent as Type<ButtonComponent>
    );
    this.renderer = injector.get(Renderer2 as Type<Renderer2>);
    this.register();
  }

  ngOnInit(): void {
    (this.buttonComponent.created as Subscribable<void>).subscribe(() => {
      this.renderer.removeClass(this.buttonComponent.element, 'invisible');
    });
    this.renderer.addClass(this.buttonComponent.element, 'invisible');
    this.renderer.addClass(this.buttonComponent.element, 'btn');
    this.buttonComponent.ngOnInit();
  }

  ngOnDestroy(): void {
    this.buttonComponent.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    this.buttonComponent.ngAfterViewInit();
  }

  ngAfterContentChecked(): void {
    this.buttonComponent.ngAfterContentChecked();
  }

  private register(): void {
    const buttonComponent = this
      .buttonComponent as unknown as ObjectValue<unknown>;

    inheritedInputs.forEach((name) => {
      Object.defineProperty(this, name, {
        get() {
          return buttonComponent[name];
        },
        set(value) {
          buttonComponent[name] = value;
        },
      });
    });

    inheritedOutputs.forEach((name) => {
      Object.defineProperty(this, name, {
        get() {
          return buttonComponent[name];
        },
      });
    });
  }

  @OnPropertyChange('iconOnly')
  onIconOnlyChange(): void {
    if (this.iconOnly) {
      this.content = ''
    }
  }
}

@Directive({selector: '[button]'})
export class ButtonDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
  }
}
