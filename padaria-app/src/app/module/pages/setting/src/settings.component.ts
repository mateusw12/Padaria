import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Setting } from '@module/models';
import { SettingRepository } from '@module/repository';
import { untilDestroyed } from '@module/utils/common';
import {
  FILE_EXTENSION_NOT_SUPPORTED,
  FILE_NOT_FOUND,
} from '@module/utils/constant';
import { ErrorData } from '@module/utils/core';
import { markAllAsTouched } from '@module/utils/forms';
import { transformArrayBufferToBase64 } from '@module/utils/functions';
import { AppFile } from '@module/utils/interfaces';
import {
  ErrorHandler,
  FileManagerService,
  MessageService,
  ToastService,
} from '@module/utils/services';
import {
  ColorPickerComponent,
  SelectedEventArgs,
  UploaderComponent,
} from '@syncfusion/ej2-angular-inputs';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'pt-BR': {
    colorpicker: {
      Apply: 'Aplicar',
      Cancel: 'Cancelar',
      ModeSwitcher: 'Selecionar Modo',
    },
  },
});

const NEW_ID = 'NOVO';

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  logo: FormControl<string | null>;
  themeColor: FormControl<string | null>;
  fileName: FormControl<string | null>;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  get disabled(): boolean {
    return this.remove;
  }

  form = this.createForm();
  readonly maxFileLenght = 100 * 1024 * 1024;

  @ViewChild(UploaderComponent, { static: false })
  private uploader!: UploaderComponent;

  @ViewChild(ColorPickerComponent, { static: false })
  private coloPicker!: ColorPickerComponent;

  private remove = false;

  constructor(
    private errorHandler: ErrorHandler,
    private toastService: ToastService,
    private settingRepository: SettingRepository,
    private fileManangerService: FileManagerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.reset();
    this.findSetting();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();
    this.settingRepository
      .add(model)
      .pipe(untilDestroyed(this))
      .subscribe(
        async () => {
          this.toastService.showSuccess();
          window.location.reload();
          this.findSetting();
        },
        async (error) => this.handleError(error)
      );
  }

  async onRemoveClick(): Promise<void> {
    const confirmed = await this.messageService.showConfirmDelete();
    if (!confirmed) return;
    const id = this.form.controls.id.value as string;
    this.settingRepository
      .deleteById(Number(id))
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showRemove();
          this.reset();
        },
        (error) => this.handleError(error)
      );
  }

  selectFile(): void {
    const uploder = this.uploader as unknown as {
      browseButton: HTMLButtonElement;
    };
    uploder.browseButton.click();
  }

  async onDownloadFileClick(): Promise<void> {
    const fileName = this.form.controls.fileName.value as string;
    const file = this.form.controls.logo.value as string;
    try {
      this.fileManangerService.downloadFile(file, fileName);
    } catch (error) {
      const errorHandler = await this.errorHandler.handle(error);
      if (errorHandler.status === 404) {
        this.toastService.showWarning(FILE_NOT_FOUND);
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
      this.toastService.showWarning(FILE_EXTENSION_NOT_SUPPORTED);
      return;
    }

    const rawFile = fileInfo.rawFile as Blob;
    const file = rawFile as AppFile;
    const arrayBuffer = await file.arrayBuffer();

    controls.logo.setValue(transformArrayBufferToBase64(arrayBuffer));
    controls.fileName.setValue(fileInfo.name);
    this.uploader.clearAll();
  }

  ngOnDestroy(): void {}

  private async findSetting(): Promise<void> {
    try {
      this.settingRepository
        .find()
        .pipe(untilDestroyed(this))
        .subscribe(async (setting) => {
          this.populateForm(setting);
        });
      this.remove = true;
    } catch (error) {
      const errorHandler = error as ErrorData;
      if (errorHandler.status === 404) {
        this.remove = false;
        return;
      }
      this.handleError(error);
    }
  }

  private populateForm(setting: Setting): void {
    this.form.patchValue({
      id: setting.id.toString(),
      name: setting.name,
      logo: setting.logo,
      themeColor: setting.themeColor,
      fileName: setting.fileName,
    });
  }

  private getModel(): Setting {
    const model = new Setting();
    const formValue = this.form.getRawValue();
    model.id =
      formValue.id === NEW_ID ? 0 : (formValue.id as unknown as number);
    model.name = formValue.name as string;
    model.logo = formValue.logo as string;
    model.themeColor = this.coloPicker.getValue();
    model.fileName = formValue.fileName as string;
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
        Validators.required,
        Validators.maxLength(200),
      ]),
      logo: new FormControl<string | null>(null),
      themeColor: new FormControl<string | null>(null, [
        Validators.maxLength(200),
      ]),
      fileName: new FormControl<string | null>(null, [
        Validators.maxLength(200),
      ]),
    });
  }
}
