import { ErrorService } from './../../shared/httpError/error.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { CardService } from '../../shared/card/card.service';
import { LoginService } from './../../pages/login-page/services/login.service';
import { Product } from './../../types/product';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  isAddToCart = false;
  isUserLogged = false;
  userId!: string;
  totalProductsId!: number[];
  isDisabled = false;
  currentUserAdsId?: number[];
  isUserAd = false;
  deleteUserAdSubscription?: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private loginService: LoginService,
    private cardService: CardService,
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<ProductDetailsComponent>,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.loginService.activeUser$.forEach(state => {
      if (state.isLoggedIn) {
        this.isUserLogged = state.isLoggedIn;
        this.userId = state.user.id;
      }
    });

    this.cardService.userCart$.subscribe(userCart => {
      this.isAddToCart = userCart?.totalProductsId.includes(this.product.id.toString()) ?? false;
      this.isDisabled = false;
    });

    if (this.isUserLogged) {
      this.currentUserAdsId = this.productsService.getCurrentUserAdsId();
      this.isUserAd = this.currentUserAdsId.includes(this.product.id);
    }
  }

  toggleCartItem(prodId: number) {
    this.isDisabled = true;
    this.isAddToCart = !this.isAddToCart;
    this.cardService.toggleProductInCart(prodId);
    this.closeDetailsWindow();
  }

  deleteProduct(prodId: number) {
    this.deleteUserAdSubscription = this.productsService.deleteUserAd(prodId, this.userId).subscribe({
      next: () => this.closeDetailsWindow(),
      error: (err) => this.errorService.handleError(err.message)
    })
  }

  closeDetailsWindow() {
    this.dialogRef.close();
  }


  ngOnDestroy() {
    this.deleteUserAdSubscription?.unsubscribe();
  }

}
