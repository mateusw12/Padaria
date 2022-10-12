import { Component } from '@angular/core';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
})
export class LicenseComponent {
  onNavigateClick(): void {
    const copyrightUrl =
      'https://editoraomnisscientia.com.br/blog/o-que-e-copyright/#:~:text=Por%20defini%C3%A7%C3%A3o%2C%20Copyright%20%C3%A9%20o,obra%20est%C3%A1%20protegida%20por%20lei.';
      window.open(copyrightUrl, '_blank');
    }
}
