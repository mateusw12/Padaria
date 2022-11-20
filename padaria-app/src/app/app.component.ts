import { Component } from '@angular/core';
import { AuthenticationService } from '@module/utils/services';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) {
    setTheme('bs4');
    this.authenticationService.validateUserToken();
  }
}
