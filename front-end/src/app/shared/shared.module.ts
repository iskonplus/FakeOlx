import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CardComponent } from './card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './search/search.component';
import { FilterProductsPipe } from '../pipes/filter-products.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpErrorComponent } from './httpError/http-error.component';
import { ReturnToMainComponent } from './return-to-main/return-to-main.component';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [
    ProductsComponent,
    CardComponent,
    SearchComponent,
    FilterProductsPipe,
    HttpErrorComponent,
    CardComponent,
    ReturnToMainComponent,


  ],
  exports: [
    ProductsComponent,
    SearchComponent,
    HttpErrorComponent,
    CardComponent,
    ReturnToMainComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule

  ]
})
export class SharedModule { }
