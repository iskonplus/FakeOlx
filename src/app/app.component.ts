import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  productSubscription!: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productSubscription = this.productsService.fetchProducts().subscribe();
  }

  ngOnDestroy(): void {
    this.productSubscription!.unsubscribe();
  }
  
}
