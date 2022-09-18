import { Directive, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { untilDestroyed } from '@module/utils/common';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ViewRefreshService } from '../view-refresh/view-refresh.service';

@Directive({
  selector: 'ejs-multiselect'
})
export class MultiSelectDirective implements OnInit, OnDestroy {

  constructor(
    private component: MultiSelectComponent,
    @SkipSelf() @Optional() private viewRefreshService: ViewRefreshService
  ) {
    component.floatLabelType = 'Auto';
    component.sortOrder = 'Ascending';
    component.filterType = 'Contains';
    component.mode = 'CheckBox';
    component.showSelectAll = true;
    component.showClearButton = true;
  }

  ngOnInit(): void {
    if (this.viewRefreshService) {
      const component = (this.component as unknown as { updateDelimView(): void });
      this.viewRefreshService.onRefresh
        .pipe(untilDestroyed(this))
        .subscribe(() => component.updateDelimView());
    }
  }

  ngOnDestroy(): void { }

}
