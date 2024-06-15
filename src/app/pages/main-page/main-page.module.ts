import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { CategoriesComponent } from '../../components/categories/categories.component';



@NgModule({
  declarations: [
    MainPageComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainPageModule { }
