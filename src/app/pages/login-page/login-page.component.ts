import { Component, inject, ViewChild } from '@angular/core';
import { LoginService } from './services/login.service';
import { PopupComponent } from '../../components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})

export class LoginPageComponent  {
  readonly dialog = inject(MatDialog);
  @ViewChild('popUp') popupComponent!: PopupComponent


  constructor(private loginService: LoginService) { }

  handleLoginError(errorMessage: string) {
    this.dialog.open(PopupComponent, {
      data: errorMessage,
    });
  }

}
