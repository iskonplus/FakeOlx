import { UserState } from './../../types/user-state.model';
import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../pages/login-page/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ActiveUser } from '../../types/active-user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class NavComponent {

  activeUser$ = this.loginService.activeUser$;
  isUserLogin?: boolean;
  readonly dialog = inject(MatDialog);

  @ViewChild('popUp') popupComponent!: PopupComponent;


  constructor(private router: Router, private loginService: LoginService) {
    // this.activeUser$.subscribe(user=> console.log(user));
  }


  imgLogo = {
    url: '../../../assets/logo.png',
    alt: 'olx logo',
  }

  openMainPage() {
    this.router.navigate(['/']);
  }

  submitAds() {
    this.activeUser$.subscribe(userState => {
      console.log(userState);
      // this.isUserLogin = userState.isLoggedIn

      if (!userState.isLoggedIn) {
        this.dialog.open(PopupComponent, {
          data: "User is not logged in!",
        });
        this.router.navigate(['login']);
      } else {
        this.activeUser$.subscribe(user => {
          return this.router.navigate([`user/${userState.user.id}/add-ads`]);
        })
      }

    });


  }



}
