import { Component, inject, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../pages/login-page/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Subscription } from 'rxjs';
import { UserState } from '../../types/user-state.model';
import { CardService } from '../../shared/card/card.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class NavComponent implements OnInit, OnDestroy {

  activeUser$ = this.loginService.activeUser$;
  readonly dialog = inject(MatDialog);
  private userSubscription!: Subscription;
  favoritesSubscription!: Subscription;
  userState?: UserState;
  totalFavorites = 0



  @ViewChild('popUp') popupComponent!: PopupComponent;


  constructor(private router: Router, private loginService: LoginService, private cardService: CardService) { }

  ngOnInit(): void {
    this.userSubscription = this.activeUser$.subscribe(state => this.userState = state);
    this.favoritesSubscription = this.cardService.favorites$.subscribe(favorites=> this.totalFavorites = favorites.length)

  }

  imgLogo = {
    url: '../../../assets/logo.png',
    alt: 'olx logo',
  }

  openMainPage() {
    this.router.navigate(['/']);
  }

  submitAds() {
    if (this.userState?.isLoggedIn) {
      this.router.navigate([`user/${this.userState.user.id}/add-ads`]);
    } else {
      this.dialog.open(PopupComponent, {
        data: "User is not logged in!",
      });
      this.router.navigate(['login']);
    }

  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
