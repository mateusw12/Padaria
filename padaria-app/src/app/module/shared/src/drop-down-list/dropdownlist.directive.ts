import { Directive } from '@angular/core';
import { isNil } from '@module/utils/internal';
import { DropDownListComponent, DropDownListModel } from '@syncfusion/ej2-angular-dropdowns';
import { getValue } from '@syncfusion/ej2-base';

interface DropDownListState {
  list: HTMLElement | null;
  actionCompleteData: object;
}

@Directive({
  selector: 'ejs-dropdownlist'
})
export class DropDownListDirective {

  constructor(private component: DropDownListComponent) {
    this.component.floatLabelType = 'Auto';
    this.component.sortOrder = 'Ascending';
    this.component.filterType = 'Contains';
    this.component.showClearButton = true;
    const onPropertyChanged = this.component.onPropertyChanged;
    this.component.onPropertyChanged = (newProp, oldProp) => {
      this.beforePropertyChanged(newProp, oldProp);
      onPropertyChanged.call(this.component, newProp, oldProp);
      this.afterPropertyChanged(newProp, oldProp);
    };
  }

  private beforePropertyChanged(newProp: DropDownListModel, oldProp: DropDownListModel): void {
    if (newProp.dataSource && this.component.allowFiltering) {
      const state = this.component as unknown as DropDownListState;
      if (newProp.value === undefined) {
        newProp.value = this.component.value;
        oldProp.value = this.component.value;
      }
      state.list = null;
      state.actionCompleteData = { ulElement: null, list: null, isUpdated: false };
    }
  }

  private afterPropertyChanged(newProp: DropDownListModel, oldProp: DropDownListModel): void {
    if (newProp.dataSource && this.component.allowFiltering && this.component.text === undefined) {
      if (isNil(newProp.value)) return;
      const itemData = this.component.getDataByValue(newProp.value);
      if (!itemData) return;
      const inputElement = (this.component as unknown as { inputElement: HTMLInputElement }).inputElement;
      if (!inputElement) return;
      const textField = this.component.fields.text || 'text';
      inputElement.value = getValue(textField, itemData) as string;
    }
  }

}
