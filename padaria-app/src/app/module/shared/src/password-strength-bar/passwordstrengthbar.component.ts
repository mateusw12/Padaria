import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { OnPropertyChange } from '@module/utils/common';

@Component({
  selector: 'app-passwordstrengthbar',
  templateUrl: './passwordstrengthbar.component.html',
  styleUrls: ['./passwordstrengthbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordStrengthBarComponent {

  strength: number = 0;
  color: string = '';

  @Input()
  password: string | null = null;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  @OnPropertyChange('password')
  onPasswordChange(): void {
    this.strength = this.calculateStrength(this.password);
    this.color = this.getStrengthColor(this.strength);
    this.changeDetectorRef.markForCheck();
  }

  private getStrengthColor(strength: number): string {
    if (strength < 60) return '#d85220';
    if (strength < 80) return '#d2921d';
    if (strength < 100) return '#45a8c7';
    return '#71b771';
  }

  private calculateStrength(password: string | null): number {
    if (!password) return 0;
    let strength = 0;

    const numbersCount = (password.match(/[0-9]/g) || []).length;
    const characteresCount = (password.match(/[\W]/g) || []).length;
    const upperLettersCount = (password.match(/[A-Z]/g) || []).length;
    const lowerLettersCount = (password.match(/[a-z]/g) || []).length;
    const totalLettersCount = upperLettersCount + lowerLettersCount;

    if (password.length <= 4) strength += 5;
    else if (password.length <= 7) strength += 10;
    else strength += 25;

    if (totalLettersCount > 0 && lowerLettersCount === totalLettersCount) strength += 10;
    else if (lowerLettersCount > 0 && upperLettersCount > 0) strength += 20;

    if (numbersCount < 3) strength += 10;
    else if (numbersCount >= 3) strength += 20;

    if (characteresCount === 1) strength += 10;
    else if (characteresCount > 1) strength += 25;

    if (totalLettersCount > 0 && numbersCount > 0) strength += 2;
    if (totalLettersCount > 0 && numbersCount > 0 && characteresCount > 0) strength += 3;
    if (lowerLettersCount > 0 && upperLettersCount > 0 && numbersCount > 0 && characteresCount > 0) strength += 5;
    return strength;
  }

}
