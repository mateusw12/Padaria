import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements AfterViewInit, OnDestroy {
  constructor() {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  async open(): Promise<void> {
    console.log('entrei no departamento');
  }
}
