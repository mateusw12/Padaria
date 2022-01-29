import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-departaments',
  templateUrl: './departaments.component.html',
  styleUrls: ['./departaments.component.scss'],
})
export class DepartamentsComponent implements AfterViewInit, OnDestroy {
  constructor() {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  async open(): Promise<void> {
    console.log('entrei no departamento');
  }
}
