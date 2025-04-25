import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../pages/login-page/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class NavComponent {

  activeUser$ = this.loginService.activeUser$;
  isUserLogin = false;
    readonly dialog = inject(MatDialog);
    @ViewChild('popUp') popupComponent!: PopupComponent;


  constructor(private router: Router, private loginService: LoginService) {
    console.log(this.activeUser$);

  }


  imgLogo = {
    url: '../../../assets/logo.png',
    alt : 'olx logo',
  }

  openMainPage() {
    this.router.navigate(['/']);
  }

  submitAds() {
    this.isUserLogin = this.loginService.getUserFromStorage();
    if (!this.isUserLogin) {
      this.dialog.open(PopupComponent, {
        data: "User is not logged in!",
      });
      this.router.navigate(['login']);
    } else {
      this.activeUser$.subscribe(user => {
        return this.router.navigate([`user/${user?.id}/add-ads`]);
      })
    }
  }



}
