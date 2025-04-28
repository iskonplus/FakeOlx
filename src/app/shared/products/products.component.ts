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


  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts()
      .subscribe(
        (response) => {
          this.products = this.category ?
            response.filter(el => el.category.toLowerCase() === this.category) :
            response;
        }
      );
  }

  showMoreDetails(id: number) {
    this.dialog.open(ProductDetailsComponent, {
      data: id,
    });
  }


}
