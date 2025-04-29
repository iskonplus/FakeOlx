import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../pages/login-page/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Subscription } from 'rxjs';
import { UserState } from '../../types/user-state.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class NavComponent implements OnDestroy{

  activeUser$ = this.loginService.activeUser$;
  readonly dialog = inject(MatDialog);
  private userSubscription!: Subscription;
  userState?: UserState;

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
    this.userSubscription = this.activeUser$.subscribe(state =>  this.userState = state);

    if (this.userState?.isLoggedIn) {
      this.router.navigate([`user/${this.userState.user}/add-ads`]);
    } else {
      this.dialog.open(PopupComponent, {
        data: "User is not logged in!",
      });
      this.router.navigate(['login']);
    }

  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

  }

}
