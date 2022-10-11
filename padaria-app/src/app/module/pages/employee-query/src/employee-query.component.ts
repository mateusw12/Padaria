import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  chronicCondition,
  EmployeeQueryFilter,
  gender,
  Job,
  levelSchooling,
  maritalStatus,
} from '@module/models';
import { EmployeeQueryRepository, JobRepository } from '@module/repository';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import {
  getEnumDescription,
  getEnumDescriptions,
} from '@module/utils/functions';
import { ErrorHandler } from '@module/utils/services';
import { forkJoin } from 'rxjs';
import { SearchEmployeeModalComponent } from './search-modal/search-modal.component';

interface GridRow {
  id: number;
  employeeName: string;
  jobName: string;
  cpf: string;
  gender: string;
  maritalStatus: string[];
  chronicCondition: string[];
  levelSchooling: string[];
  phone: string;
  city: string;
  monthlySalary: number;
  street: string;
}

@Component({
  selector: 'app-employee-query',
  templateUrl: './employee-query.component.html',
  styleUrls: ['./employee-query.component.scss'],
})
export class EmployeeQueryComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];

  dataSource: GridRow[] = [];
  columns: SfGridColumnModel[] = this.createColumns();

  @ViewChild(SearchEmployeeModalComponent, { static: false })
  private searchModal!: SearchEmployeeModalComponent;

  constructor(
    private errorHandler: ErrorHandler,
    private employeeQueryRepository: EmployeeQueryRepository,
    private jobRepository: JobRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onSearchClick(): Promise<void> {
    this.searchModal.onOpen();
  }

  onFiltered(filter?: EmployeeQueryFilter): void {
    this.loadData(filter);
  }

  ngOnDestroy(): void {}

  private loadData(filter?: EmployeeQueryFilter): void {
    forkJoin([
      this.employeeQueryRepository.find(filter),
      this.jobRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([employeeFilter, jobs]) => {
          const dataSource: GridRow[] = [];
          this.jobs = jobs;

          for (const item of employeeFilter) {
            const job = jobs.find((el) => el.id === item.jobId);

            dataSource.push({
              chronicCondition: getEnumDescriptions(
                chronicCondition,
                item.chronicCondition
              ),
              city: item.city,
              cpf: item.cpf,
              employeeName: item.employeeName,
              gender: getEnumDescription(gender, item.gender),
              id: item.employeeId,
              jobName: job ? job.displayName : '',
              levelSchooling: getEnumDescriptions(
                levelSchooling,
                item.levelSchooling
              ),
              maritalStatus: getEnumDescriptions(
                maritalStatus,
                item.maritalStatus
              ),
              monthlySalary: this.getCalcMonthlySalary(
                item.workingHours,
                item.hourlyWork
              ),
              phone: item.phone,
              street: item.street,
            });
          }

          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private getCalcMonthlySalary(
    workingHours: number,
    hourlyWork: number
  ): number {
    const weeklyWage = workingHours * hourlyWork * 7;
    return weeklyWage * 30;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.numeric('id', 'Código')
        .minWidth(100)
        .identity()
        .isPrimaryKey(true),
      employeeName: SfGridColumns.text('employeeName', 'Funcionário').minWidth(
        200
      ),
      gender: SfGridColumns.text('gender', 'Gênero').minWidth(100),
      maritalStatus: SfGridColumns.text(
        'maritalStatus',
        'Estado Civil'
      ).minWidth(100),
      cpf: SfGridColumns.text('cpf', 'CPF').minWidth(100),
      jobName: SfGridColumns.text('jobName', 'Cargo').minWidth(100),
      levelSchooling: SfGridColumns.text(
        'levelSchooling',
        'Nível Escolaridade'
      ).minWidth(200),
      monthlySalary: SfGridColumns.numeric('monthlySalary', 'Salário').minWidth(
        200
      ),
      chronicCondition: SfGridColumns.text(
        'chronicCondition',
        'Doenças Crônicas'
      ).minWidth(100),
      street: SfGridColumns.text('street', 'Endereço').minWidth(100),
      city: SfGridColumns.text('city', 'Cidade').minWidth(200),
      phone: SfGridColumns.text('phone', 'Telefone').minWidth(100),
    });
  }
}
