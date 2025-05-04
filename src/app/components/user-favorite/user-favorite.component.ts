import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../types/product';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CardService } from '../../shared/card/card.service';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrl: './user-favorite.component.scss'
})
export class UserFavoriteComponent implements OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);
  @ViewChild('showDetails') ProductDetailsComponent!: ProductDetailsComponent;
  productSubscription!: Subscription;
  favoritesSubscription!: Subscription;
  favoritesCardId!: number[];
  products!: Product[];

  constructor(private productsService: ProductsService, private cardService: CardService) { }


  ngOnInit(): void {
  this.productSubscription = this.productsService.fetchProducts().subscribe(response => {
    this.products = response;

    this.favoritesSubscription = this.cardService.favorites$.subscribe(favId => {
      this.favoritesCardId = favId;
      this.products = response.filter(card => this.favoritesCardId.includes(card.id));
    });
  });

  }

   showMoreDetails(product: Product) {
      const dialogRef = this.dialog.open(ProductDetailsComponent, {
        data: product,
      })
   }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
    this.productSubscription.unsubscribe();

  }

}
