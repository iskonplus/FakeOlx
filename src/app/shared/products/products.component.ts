import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Card } from '../../types/card';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  products!: Card[];
  isMoreInformation = false;
  @Input() category?: string | null;
  @Input() term = "";
  readonly dialog = inject(MatDialog);
  @ViewChild('showDetails') ProductDetailsComponent!: ProductDetailsComponent;
  isSpinnerActive = false;


  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.isSpinnerActive = true;

    this.productsService.getProducts()
      .subscribe(
        (response) => {

          this.products = this.category ?
            response.filter(el => el.category.toLowerCase() === this.category) :
            response;
          this.isSpinnerActive = false;
        }
      );
  }

  showMoreDetails(id: number) {
    this.dialog.open(ProductDetailsComponent, {
      data: id,
    });
  }


}
