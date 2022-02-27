import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteType } from '@module/models';
import { NoteTypeService } from '@module/services';
import { ToastServiceComponent, FieldErrorDisplayComponent } from '@module/shared';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';


const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  abbreviation: string;
  name: string;
}

@Component({
  selector: 'app-note-types',
  templateUrl: './note-types.component.html',
  styleUrls: ['./note-types.component.scss'],
  providers: [
    SortService,
    DialogComponent,
    ToastServiceComponent,
    NoteTypeService,
    FieldErrorDisplayComponent,
  ],
})
export class NoteTypesComponent implements OnInit {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;
  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;

  constructor(
    private toastService: ToastServiceComponent,
    private noteTypeService: NoteTypeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findNoteType(id);
      }
      this.isModalOpen = true;
      this.modal.show();
    } catch (error) {}
  }

  async onModalClose(): Promise<void> {
    this.isModalOpen = false;
  }

  async onEdit(model: GridRow): Promise<void> {
    await this.onOpen(model.id);
  }

  async onRemove(model: GridRow): Promise<void> {
    if (!model.id) return;
    this.noteTypeService
      .deleteById(model.id)
      .pipe()
      .subscribe(
        async () => {
          await this.toastService.showRemove();
          this.loadData();
        },
        (error) => this.toastService.showRemove(error)
      );
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.toastService.showError('Formulário Inválido');
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    if (
      exists
        ? this.noteTypeService
            .updateById(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.showUpdate();
                this.reset();
              },
              (error) => this.toastService.showError(error)
            )
        : this.noteTypeService
            .add(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.showSucess();
              },
              (error) => this.toastService.showError(error)
            )
    )
      this.loadData();
    return;
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.noteTypeService
      .findAll()
      .pipe()
      .subscribe(async (noteTypes) => {
        this.dataSource = noteTypes;
      });
  }

  private async findNoteType(id: number): Promise<void> {
    this.noteTypeService
      .findById(id)
      .pipe()
      .subscribe(
        async (noteType) => {
          this.populateForm(noteType);
        },
        (error) => this.toastService.showError(error)
      );
  }

  private populateForm(noteType: NoteType): void {
    this.form.patchValue({
      id: noteType.id,
      name: noteType.name,
      abbreviation: noteType.abbreviation
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

  private createForm() {
    return this.formBuilder.group({
      id: [{ value: NEW_ID, disabled: true }, [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(200)]],
      abbreviation: ['', Validators.maxLength(5)],
    });
  }
}
