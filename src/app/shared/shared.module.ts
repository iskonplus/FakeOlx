import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CardComponent } from '../components/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './search/search.component';
import { FilterProductsPipe } from '../pipes/filter-products.pipe';



@NgModule({
  declarations: [
    ProductsComponent,
    CardComponent,
    SearchComponent,
    FilterProductsPipe

  ],
  exports: [
    ProductsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,

  ]
})
export class ProductsModule { }
