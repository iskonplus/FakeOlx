import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { SearchComponent } from '../../components/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';





@NgModule({
  declarations: [
    MainPageComponent,
    CategoriesComponent,
    SearchComponent,
    ],
    imports: [
      CommonModule,
      MatIconModule,
      ReactiveFormsModule
  ]
})
export class MainPageModule { }
