import { ProductsService } from '../../services/products.service';
import { CardService } from '../../shared/card/card.service';
import { LoginService } from './../../pages/login-page/services/login.service';
import { Product } from './../../types/product';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  isAddToCart = false;
  isUserLogged = false;
  userId!: string;
  totalProductsId!: number[];
  isDisabled = false;
  currentUserAdsId?: number[];
  isUserAd = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private loginService: LoginService,
    private cardService: CardService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loginService.activeUser$.forEach(state => {
      if (state.isLoggedIn) {
        this.isUserLogged = state.isLoggedIn;
      }
    });

    this.cardService.userCart$.subscribe(userCart => {
      this.isAddToCart = userCart?.totalProductsId.includes(this.product.id.toString()) ?? false;
      this.isDisabled = false;
    });

    if (this.isUserLogged) {
      this.currentUserAdsId = this.productsService.getCurrentUserAdsId();
      this.isUserAd = this.currentUserAdsId.includes(this.product.id)
      console.log("is it ad of user: ", this.isUserAd);
    }
  }

  toggleCartItem(prodId: number) {
    this.isDisabled = true;
    this.isAddToCart = !this.isAddToCart;
    this.cardService.toggleProductInCart(prodId);
  }

}
