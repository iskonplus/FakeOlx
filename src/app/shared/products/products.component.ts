import { LoginService } from './../../pages/login-page/services/login.service';
import { CardService } from './../card/card.service';
import { Component, inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../types/product';
import { Subscription } from 'rxjs';
import { ActiveUser } from '../../types/active-user';
import { UserCart } from '../../types/user-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  productSubscription?: Subscription;
  allProducts!: Product[];
  products!: Product[];
  cartSubscription?: Subscription;
  isMoreInformation = false;
  isSpinnerActive = false;
  activeUser!: ActiveUser;

  readonly dialog = inject(MatDialog);
  @ViewChild('showDetails') ProductDetailsComponent!: ProductDetailsComponent;

  @Input() category?: string | null;
  @Input() term = "";
  @Input() favorites!: number[];
  @Input() userCart: UserCart | null = null;
  @Input() userAdsId: number[]| undefined;

  constructor(private productsService: ProductsService, private cardService: CardService, private loginService: LoginService) { }

  ngOnInit() {
    this.isSpinnerActive = true;

    this.productSubscription = this.productsService.products$
      .subscribe(response => {
        this.allProducts = response;
        this.applyFilters();
        this.isSpinnerActive = false;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['favorites'] || changes['userCart'] || changes['userAdsId']) && this.products) {
      this.applyFilters();
    }
  }

  private applyFilters(): void {
    if (this.category) {
      this.products = this.allProducts.filter(product =>
        product.category.toLowerCase() === this.category!.toLowerCase()
      );
    } else if (this.favorites) {
      this.products = this.allProducts.filter(product =>
        this.favorites.includes(product.id)
      );
    } else if (this.userCart) {
      this.products = this.allProducts.filter(product => {
        return this.userCart?.totalProductsId.includes(product.id.toString());
      })
    } else if (this.userAdsId) {
      this.products = this.allProducts.filter(product => {
        return this.userAdsId?.includes(product.id);
      });
    } else {
      this.products = this.allProducts;
    }

  }

  showMoreDetails(product: Product) {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: product,
    })
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }


}
