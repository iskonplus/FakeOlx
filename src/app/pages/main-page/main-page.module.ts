import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { SearchComponent } from '../../components/search/search.component';



@NgModule({
  declarations: [
    MainPageComponent,
    CategoriesComponent,
    SearchComponent,
    ],
    imports: [
      CommonModule,
  ]
})
export class MainPageModule { }
