import { ProductsService } from './../../services/products.service';
import { Component } from '@angular/core';
import { LoginService } from '../login-page/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  activeUser$ = this.loginService.activeUser$;
  userId?: string | null;
  userAdsId: number[] = [];

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.productsService.userAds$.subscribe(userAds => {
      userAds.totalAds.forEach(ad => this.userAdsId?.push(+ad.id));
    })
  }

  logOut() {
    this.loginService.clearUser();
    this.router.navigate(['/']);
  }

}
