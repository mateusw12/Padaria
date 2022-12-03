import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserRole } from '@module/models';
import { UserRepository } from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import { getDescription, toArray } from '@module/utils/functions/enum';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  userName: string;
  role: string;
  isActive: boolean;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
  role: FormControl<UserRole | null>;
  isActive: FormControl<boolean | null>;
  isDarkMode: FormControl<boolean | null>;
  email: FormControl<string | null>;
}

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();

  roles = toArray(UserRole).filter((el) => el.value !== UserRole.None);

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private userRepository: UserRepository
  ) {}

  ngOnInit(): void {
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

  async onModalClose(): Promise<void> {
    this.modal.onCloseClick();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();
    const exists = model.id > 0;

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
        ? this.userRepository.updateById(model)
        : this.userRepository.add(model)
      )
        .pipe(untilDestroyed(this))
        .subscribe(
          async () => {
            this.toastService.showSuccess();
            this.reset();
            if (exists) this.modal.onCloseClick();
            if (!exists) this.reloadPage();
          },
          async (error) => this.handleError(error)
        )
    )
      return;
  }

  ngOnDestroy(): void {}

  private reloadPage(): void {
    window.location.reload();
  }

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findUser(id);
      }
      this.modal.open();
    } catch (error) {
      this.handleError(error);
    }
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

    this.userRepository
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
    this.userRepository
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        async (users) => {
          const dataSource: GridRow[] = [];

          for (const item of users) {
            dataSource.push({
              id: item.id,
              role: getDescription(UserRole, item.role),
              userName: item.userName,
              isActive: item.isActive,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async findUser(id: number): Promise<void> {
    this.userRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.populateForm(user);
      });
  }

  private populateForm(user: User): void {
    this.form.patchValue({
      id: user.id.toString(),
      name: user.name,
      role: user.role,
      userName: user.userName,
      email: user.email,
      isActive: user.isActive,
      isDarkMode: user.isDarkMode,
    });
  }

  private getModel(): User {
    const model = new User();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.name = formValue.name as string;
    model.userName = formValue.name as string;
    model.role = formValue.role as UserRole;
    model.password = formValue.password as string;
    model.email = formValue.email as string;
    model.isActive = formValue.isActive as boolean;
    model.isDarkMode = formValue.isDarkMode as boolean;
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
      userName: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      role: new FormControl<UserRole | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      email: new FormControl<string | null>(null, [
        Validators.email,
        Validators.maxLength(300),
      ]),
      isActive: new FormControl<boolean | null>(false),
      isDarkMode: new FormControl<boolean | null>(false),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      userName: SfGridColumns.text('userName', 'Usuário').minWidth(200),
      role: SfGridColumns.text('role', 'Perfil').minWidth(100),
      isActive: SfGridColumns.boolean('isActive', 'Ativo').minWidth(100),
    });
  }
}
