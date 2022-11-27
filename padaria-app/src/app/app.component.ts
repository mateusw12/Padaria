import { Component } from '@angular/core';
import { AuthenticationService } from '@module/utils/services';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    setTheme('bs4');
  }
}
