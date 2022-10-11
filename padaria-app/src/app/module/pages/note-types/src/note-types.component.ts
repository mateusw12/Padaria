import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteType } from '@module/models';
import { NoteTypeRepository } from '@module/repository';
import { ModalComponent } from '@module/shared/src';
import { FormGridCommandEventArgs } from '@module/shared/src/form-grid/formgrid.component';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  abbreviation: string;
  name: string;
}

@Component({
  selector: 'app-note-types',
  templateUrl: './note-types.component.html',
})
export class NoteTypesComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  columns: SfGridColumnModel[] = this.createColumns();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private noteTypeRepository: NoteTypeRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
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
        ? this.noteTypeRepository.updateById(model)
        : this.noteTypeRepository.add(model)
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

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findNoteType(id);
      }
      this.modal.open();
    } catch (error) {}
  }

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

    this.noteTypeRepository
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
    this.noteTypeRepository
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        async (noteTypes) => {
          this.dataSource = noteTypes;
        },
        (error) => this.handleError(error)
      );
  }

  private async findNoteType(id: number): Promise<void> {
    this.noteTypeRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(async (noteType) => {
        this.populateForm(noteType);
      });
  }

  private populateForm(noteType: NoteType): void {
    this.form.patchValue({
      id: noteType.id,
      name: noteType.name,
      abbreviation: noteType.abbreviation,
    });
  }

  private getModel(): NoteType {
    const model = new NoteType();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    model.abbreviation = formValue.abbreviation as string;
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

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      id: new FormControl({ value: NEW_ID, disabled: true }),
      name: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      abbreviation: new FormControl(null, [Validators.maxLength(10)]),
    }));
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      abbreviation: SfGridColumns.text('abbreviation', 'Sigla').minWidth(150),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
    });
  }
}
