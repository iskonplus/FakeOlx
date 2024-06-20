import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { SearchComponent } from '../../components/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from '../../components/products/products.component';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    MainPageComponent,
    CategoriesComponent,
    SearchComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class MainPageModule { }
