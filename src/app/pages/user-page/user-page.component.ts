import { ProductsService } from './../../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login-page/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit, OnDestroy{
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  activeUser$ = this.loginService.activeUser$;
  userAds$ = this.productsService.userAds$;
  userId?: string | null;
  userAdsId: number[] = [];
  userAdsSubscription?: Subscription;

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.userAdsSubscription = this.productsService.userAds$.subscribe(userAds => {
      userAds.totalAds.forEach(ad => this.userAdsId?.push(+ad.id));
    })
  }

  logOut() {
    this.loginService.clearUser();
    this.router.navigate(['/']);
  }

  deleteUser() {
    console.log("this user will be delete", this.userId);
    // if (this.userId) {
    //   this.productsService.deleteUserAds(this.userId).subscribe(() => {
    //     this.loginService.clearUser();
    //     this.router.navigate(['/']);
    //   });
    // }
  }


  ngOnDestroy(): void {
    this.userAdsSubscription?.unsubscribe();
  }

}
