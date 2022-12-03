import { untilDestroyed } from '@module/utils/common';
import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { SettingRepository } from '@module/repository';
import { ErrorHandler } from '@module/utils/services';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit, OnDestroy {
  title: string = '';

  constructor(
    private settingsRepository: SettingRepository,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.settingsRepository
      .find()
      .pipe(untilDestroyed(this))
      .subscribe(
        (settings) => (this.title = settings.name),
        (error) => this.handleError(error)
      );
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }
  
}
