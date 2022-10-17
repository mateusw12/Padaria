import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileExtensions, Manufacturer, NoteType, PurchaseControl } from '@module/models';
import {
  ManufacturerRepository,
  NoteTypeRepository,
  PurchaseControlRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared/src';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  FileManagerService,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { forkJoin } from 'rxjs';
import {
  SelectedEventArgs,
  UploaderComponent,
} from '@syncfusion/ej2-angular-inputs';
import { AppFile } from '@module/utils/interfaces';
import { getFileExtension, transformArrayBufferToBase64 } from '@module/utils/functions';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  fiscalNoteId: string;
  manufacturerName: string;
  noteTypeName: string;
  amount: number;
  price: number;
  purchaseDate: Date;
  fiscalNoteDownload: string;
}

@Component({
  selector: 'app-purchase-controls',
  templateUrl: './purchase-control.component.html',
})
export class PurchaseControlComponent implements OnInit, OnDestroy {
  columns: SfGridColumnModel[] = [];
  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  manufacturers: Manufacturer[] = [];
  noteTypes: NoteType[] = [];
  readonly maxFileLenght = 100 * 1024 * 1024;

  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  @ViewChild(UploaderComponent, { static: false })
  private uploader!: UploaderComponent;

  constructor(
    private errorHandler: ErrorHandler,
    private messageService: MessageService,
    private toastService: ToastService,
    private purchaseControlRepository: PurchaseControlRepository,
    private manufacturerRepository: ManufacturerRepository,
    private noteTypeRepository: NoteTypeRepository,
    private fileManangerService: FileManagerService
  ) {}

  ngOnInit(): void {
    this.columns = this.createColumns();
    this.loadData();
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
        ? this.purchaseControlRepository.updateById(model)
        : this.purchaseControlRepository.add(model)
      )
        .pipe(untilDestroyed(this))
        .subscribe(
          async () => {
            this.toastService.showSuccess();
            this.reset();
            if (exists) this.onModalClose();
            this.loadData();
          },
          async (error) => this.handleError(error)
        )
    )
      return;
  }

  async onModalClose(): Promise<void> {
    this.modal.onCloseClick();
  }

  selectFile(): void {
    const uploder = this.uploader as unknown as {
      browseButton: HTMLButtonElement;
    };
    uploder.browseButton.click();
  }

  async onDownloadFileClick(): Promise<void> {
    try {
      const controls = this.form.controls;
      const file = controls.file.value as string;
      const fileName = controls.fileName.value as string;
      this.fileManangerService.downloadFile(file, fileName);
    } catch (error) {
      const handledError = await this.errorHandler.handle(error);
      if (handledError.status === 404) {
        this.toastService.showWarning('Arquivo não encontrado!');
        return;
      }
      this.handleError(error);
    }
  }

  async onFileSelect(event: SelectedEventArgs): Promise<void> {
    const controls = this.form.controls;
    if (event.filesData.length === 0) return;
    const fileInfo = event.filesData[0];
    if (fileInfo.statusCode !== '1') {
      this.toastService.showWarning(fileInfo.status);
      return;
    }

    const fileExtension = getFileExtension(fileInfo.name);
    if (fileExtension === FileExtensions.None) {
      this.toastService.showWarning('Extensão não suportada!');
      return;
    }

    const rawFile = fileInfo.rawFile as Blob;
    const file = rawFile as AppFile;
    const arrayBuffer = await file.arrayBuffer();

    controls.fileName.setValue(fileInfo.name);
    controls.file.setValue(transformArrayBufferToBase64(arrayBuffer));
    controls.fileExtension.setValue(fileExtension);

    this.uploader.clearAll();
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

    this.purchaseControlRepository
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

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findPurchase(id);
      }
      this.modal.open();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async findPurchase(id: number): Promise<void> {
    this.purchaseControlRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe(async (purchase) => this.populateForm(purchase));
  }

  private loadData(): void {
    forkJoin([
      this.manufacturerRepository.findAll(),
      this.purchaseControlRepository.findAll(),
      this.noteTypeRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([manufacturers, purchases, noteTypes]) => {
          const dataSource: GridRow[] = [];
          this.manufacturers = manufacturers;
          this.noteTypes = noteTypes;

          for (const item of purchases) {
            const manufacturer = manufacturers.find(
              (el) => el.id === item.manufacturerId
            );
            const noteType = noteTypes.find((el) => el.id === item.noteTypeId);

            dataSource.push({
              amount: item.amount,
              fiscalNoteDownload: '',
              fiscalNoteId: item.fiscalNoteId,
              id: item.id,
              manufacturerName: manufacturer ? manufacturer.name : '',
              name: item.name,
              price: item.price,
              purchaseDate: item.purchaseDate,
              noteTypeName: noteType ? noteType.name : '',
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private populateForm(model: PurchaseControl): void {
    this.form.patchValue({
      id: model.id,
      amount: model.amount,
      deliveryDate: model.deliveryDate,
      description: model.description,
      file: model.file,
      fileName: model.fileName,
      fiscalNoteId: model.fiscalNoteId,
      manufacturerId: model.manufacturerId,
      price: model.price,
      purchaseDate: model.purchaseDate,
    });
  }

  private getModel(): PurchaseControl {
    const model = new PurchaseControl();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.amount = formValue.amount as number;
    model.deliveryDate = formValue.deliveryDate as Date;
    model.description = formValue.description as string;
    model.file = formValue.file as string;
    model.fileName = formValue.fileName as string;
    model.fiscalNoteId = formValue.fiscalNoteId as string;
    model.manufacturerId = formValue.manufacturerId as number;
    model.price = formValue.price as number;
    model.purchaseDate = formValue.purchaseDate as Date;
    model.name = formValue.name as string;
    model.noteTypeId = formValue.noteTypeId as number;
    return model;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      id: new FormControl({ value: NEW_ID, disabled: true }),
      name: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      description: new FormControl(null, Validators.maxLength(200)),
      deliveryDate: new FormControl(null, Validators.required),
      file: new FormControl(null),
      purchaseDate: new FormControl(null, Validators.required),
      manufacturerId: new FormControl(null, Validators.required),
      noteTypeId: new FormControl(null, Validators.required),
      fiscalNoteId: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      fileName: new FormControl(null, Validators.maxLength(200)),
      amount: new FormControl(null, [
        Validators.min(0),
        FormValidators.required,
      ]),
    }));
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(75).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
      fiscalNoteId: SfGridColumns.text('fiscalNoteId', 'Nota Fiscal').minWidth(
        100
      ),
      purchaseDate: SfGridColumns.date('purchaseDate', 'Data Compra').minWidth(
        100
      ),
      manufacturerName: SfGridColumns.text(
        'manufacturerName',
        'Fabricante'
      ).minWidth(200),
      noteTypeName: SfGridColumns.text('noteTypeName', 'Tipo de Nota').minWidth(
        200
      ),
      amount: SfGridColumns.numeric('amount', 'Quantidade').minWidth(100),
      price: SfGridColumns.numeric('price', 'Preço').minWidth(100),
      fiscalNoteDownload: SfGridColumns.text(
        'fiscalNoteDownload',
        'Baixar Nota Fiscal'
      ).minWidth(100),
    });
  }
}
