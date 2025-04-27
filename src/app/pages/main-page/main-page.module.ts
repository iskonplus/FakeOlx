import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductsModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MainPageComponent,
    CategoriesComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    ProductsModule
  ]
})
export class MainPageModule { }
