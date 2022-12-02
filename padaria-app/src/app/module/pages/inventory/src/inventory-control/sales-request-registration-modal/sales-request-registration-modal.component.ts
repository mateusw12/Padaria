import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Employee,
  Inventory,
  NoteType,
  PaymentCondition,
  Product,
  SalesRequest,
  Supplier,
} from '@module/models';
import {
  InventoryRepository,
  SalesRequestRepository,
} from '@module/repository';
import { ModalComponent } from '@module/shared';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import { toArray } from '@module/utils/functions/enum';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { forkJoin } from 'rxjs';
import { InventoryService } from '../../inventory.service';

const NEW_ID = 'NOVO';

interface FormModel {
  itemId: FormControl<string | null>;
  fiscalNoteId: FormControl<string | null>;
  itemDescription: FormControl<string | null>;
  productId: FormControl<number | null>;
  employeeId: FormControl<number | null>;
  supplierId: FormControl<number | null>;
  amount: FormControl<number | null>;
  noteTypeId: FormControl<number | null>;
  observation: FormControl<string | null>;
  totalValue: FormControl<number | null>;
  paymentCondition: FormControl<PaymentCondition | null>;
  requestId: FormControl<string | null>;
}

@Component({
  selector: 'app-sales-request-modal',
  templateUrl: './sales-request-registration-modal.component.html',
})
export class SalesRequestRegistrationModalComponent
  implements OnInit, OnDestroy
{
  @Output()
  saved = new EventEmitter<void>();

  products: Product[] = [];
  employees: Employee[] = [];
  suppliers: Supplier[] = [];
  noteTypes: NoteType[] = [];
  paymentConditions = toArray(PaymentCondition).filter(
    (el) => el.value !== PaymentCondition.None
  );
  form: FormGroup<FormModel> = this.createForm();

  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  constructor(
    private inventoryRepository: InventoryRepository,
    private salesRequestRepository: SalesRequestRepository,
    private messageService: MessageService,
    private toastService: ToastService,
    private inventoryService: InventoryService,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(): Promise<void> {
    this.reset();
    this.modal.open();
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
    const exists = model.itemId > 0;

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
        ? this.salesRequestRepository.updateById(model)
        : this.salesRequestRepository.add(model)
      )
        .pipe(untilDestroyed(this))
        .subscribe(
          async () => {
            this.toastService.showSuccess();
            await this.addInventory();
            this.saved.emit();
            this.reset();
            if (exists) this.modal.onCloseClick();
          },
          async (error) => this.handleError(error)
        )
    )
      return;
  }

  private async addInventory(): Promise<void> {
    try {
      const inventoryModel = this.getInventoryModel();
      await untilDestroyedAsync(
        this.inventoryRepository.add(inventoryModel),
        this
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    forkJoin([
      this.inventoryService.loadEmployees(),
      this.inventoryService.loadProducts(),
      this.inventoryService.loadSuppliers(),
      this.inventoryService.loadNoteTypes(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([employees, products, suppliers, noteTypes]) => {
          this.employees = employees;
          this.products = products;
          this.suppliers = suppliers;
          this.noteTypes = noteTypes;
        },
        (error) => this.handleError(error)
      );
  }

  private reset(): void {
    this.form.reset({ itemId: NEW_ID });
  }

  private getModel(): SalesRequest {
    const model = new SalesRequest();
    const formValue = this.form.getRawValue();
    model.amount = formValue.amount as number;
    model.observation = formValue.observation as string;
    model.paymentCondition = formValue.paymentCondition as PaymentCondition;
    model.requestId = formValue.requestId as string;
    model.totalValue = formValue.totalValue as number;
    model.itemId = formValue.itemId === NEW_ID ? 0 : Number(formValue.itemId);
    model.productId = formValue.productId as number;
    model.employeeId = formValue.employeeId as number;
    model.noteTypeId = formValue.noteTypeId as number;
    model.supplierId = formValue.supplierId as number;
    return model;
  }

  private getInventoryModel(): Inventory {
    const model = new Inventory();
    const formValue = this.form.getRawValue();
    model.fiscalNoteId = formValue.fiscalNoteId as string;
    model.productId = formValue.productId as number;
    model.requestId = formValue.requestId as string;
    model.itemDescription = formValue.itemDescription as string;
    model.itemId = formValue.itemId === NEW_ID ? 0 : Number(formValue.itemId);
    return model;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      itemId: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      itemDescription: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      fiscalNoteId: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      amount: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      employeeId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      noteTypeId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      productId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      supplierId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      observation: new FormControl<string | null>(null, [
        Validators.maxLength(1000),
      ]),
      paymentCondition: new FormControl<PaymentCondition | null>(null, [
        Validators.required,
      ]),
      requestId: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      totalValue: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }
}
