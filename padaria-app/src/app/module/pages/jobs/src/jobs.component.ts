import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Job } from '@module/models';
import { JobService } from '@module/services';
import { ToastServiceComponent } from '@module/shared';
import { SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  providers: [SortService, JobService, DialogComponent, ToastServiceComponent],
})
export class JobsComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [];
  form: FormGroup = this.createForm();
  isModalOpen = false;

  constructor(
    private toastService: ToastServiceComponent,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findJob(id);
      }
      this.isModalOpen = true;
      this.modal.show();
    } catch (error) {}
  }

  async onModalClose(): Promise<void> {
    this.isModalOpen = false;
  }

  async onEdit(model: GridRow): Promise<void> {
    console.log(model);
    await this.onOpen(model.id);
  }

  async onRemove(model: GridRow): Promise<void> {
    if (!model.id) return;
    this.jobService
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
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    if (
      exists
        ? this.jobService
            .updateById(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.showUpdate();
                this.reset();
              },
              (error) => this.toastService.showError(error)
            )
        : this.jobService
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
    this.jobService
      .findAll()
      .pipe()
      .subscribe(async (jobs) => {
        this.dataSource = jobs;
      });
  }

  private async findJob(id: number): Promise<void> {
    this.jobService
      .findById(id)
      .pipe()
      .subscribe(
        async (job) => {
          this.populateForm(job);
        },
        (error) => this.toastService.showError(error)
      );
  }

  private populateForm(job: Job): void {
    this.form.patchValue({
      id: job.id,
      name: job.name,
    });
  }

  private getModel(): Job {
    const model = new Job();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    return model;
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
    }));
  }
}
