import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }
  categoriesData = this.categoriesService.categoriesData;

  ngOnInit(): void { }

}
