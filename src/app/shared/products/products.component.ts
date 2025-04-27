import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Card } from '../../types/card';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  products!: Card[];
  isMoreInformation = false;
  @Input() category?: string | null;

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


}
