import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../types/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  products!: Product[];
  productSubscription!: Subscription;
  isMoreInformation = false;
  @Input() category?: string | null;
  @Input() term = "";
  readonly dialog = inject(MatDialog);
  @ViewChild('showDetails') ProductDetailsComponent!: ProductDetailsComponent;
  isSpinnerActive = false;


  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.isSpinnerActive = true;

    this.productSubscription = this.productsService.fetchProducts()
      .subscribe(
        response => {
          this.products = this.category
            ? response.filter(product => product.category.toLowerCase() === this.category)
            : response;
          this.isSpinnerActive = false;
        }
      );
  }

  showMoreDetails(product: Product) {
    this.dialog.open(ProductDetailsComponent, {
      data: product,
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();

  }


}
