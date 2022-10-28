import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from '@module/models';
import { BrandRepository } from '@module/repository';
import { ModalComponent, FormGridCommandEventArgs } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import { Nullable } from '@module/utils/internal';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit, OnDestroy {
  modal!: ModalComponent;

  dataSource: GridRow[] = [];
  form = this.createForm();
  columns: SfGridColumnModel[] = this.createColumns();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private brandRepository: BrandRepository,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findBrand(id);
      }
      this.modal.open();
    } catch (error) {
      this.handleError(error);
    }
  }

  async onModalClose(): Promise<void> {
    this.modal.onCloseClick();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;

    if (exists) {
      const confirmed$ = this.messageService.showConfirmSave();
      const confirmed = await untilDestroyedAsync(
        confirmed$.asObservable(),
        this
      );
      if (!confirmed) return;
    }

    if (
      (exists
        ? this.brandRepository.updateById(model)
        : this.brandRepository.add(model)
      )
        .pipe(untilDestroyed(this))
        .subscribe(
          async () => {
            await this.toastService.showSuccess();
            this.loadData();
          },
          async (error) => this.handleError(error)
        )
    )
      return;
  }

  onCommand(event: FormGridCommandEventArgs): void {
    switch (event.command) {
      case 'Add':
        this.onCommandAdd();
        break;
      case 'Edit':
        this.onCommandEdit(event.rowData as GridRow);
        break;
      case 'Remove':
        this.onCommandRemove(event.rowData as GridRow);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {}

  private onCommandAdd(): void {
    this.onOpen();
  }

  private onCommandEdit(model: GridRow): void {
    this.onOpen(model.id);
  }

  private async onCommandRemove(model: GridRow): Promise<void> {
    const confirmed$ = this.messageService.showConfirmSave();
    const confirmed = await untilDestroyedAsync(
      confirmed$.asObservable(),
      this
    );
    if (!confirmed) return;

    this.brandRepository
      .deleteById(model.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showRemove();
          this.loadData();
        },
        (error) => this.handleError(error)
      );
  }

  private loadData(): void {
    this.brandRepository
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        async (brands) => {
          this.dataSource = brands;
        },
        (error) => this.handleError(error)
      );
  }

  private async findBrand(id: number): Promise<void> {
    this.brandRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(async (brand) => {
        this.populateForm(brand);
      });
  }

  private populateForm(brand: Brand): void {
    this.form.patchValue({
      id: brand.id.toString(),
      name: brand.name,
    });
  }

  private getModel(): Brand {
    const model = new Brand();
    const formValue = this.form.getRawValue();
    model.id =
      formValue.id === NEW_ID ? 0 : (formValue.id as unknown as number);
    model.name = formValue.name as string;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      name: new FormControl<string | null>(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
    });
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
    });
  }
}
