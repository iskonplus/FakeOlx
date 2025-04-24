import { Component, inject, ViewChild } from '@angular/core';
import { LoginService } from './services/login.service';
import { PopupComponent } from '../../components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})

export class LoginPageComponent  {
  readonly dialog = inject(MatDialog);
  @ViewChild('popUp') popupComponent!: PopupComponent;
  selectedTabIndex = 0;
  isSpinnerActive = false;



  constructor(private loginService: LoginService, private cdr: ChangeDetectorRef) {
  }


  handleRegistrationSuccess() {
    console.log('success');
    this.selectedTabIndex = 0;
    this.cdr.detectChanges();
  }

  handleLoginError(errorMessage: string) {
    this.dialog.open(PopupComponent, {
      data: errorMessage,
    });
  }

  handleSpinner() {
    this.isSpinnerActive = !this.isSpinnerActive;
  }

}
