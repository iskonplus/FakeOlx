import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent implements OnInit, OnDestroy {
  productsSubscription!: Subscription;


  constructor(private categoriesService: CategoriesService,
    private productsService: ProductsService, private router: Router) { }

  categoriesCard: { heading: string; imgPath: string; color: string }[] = [];
  availableCategories: string[] = [];



  ngOnInit(): void {
    this.productsSubscription = this.productsService.products$.subscribe(response => {
      response.forEach(card => {
        this.availableCategories.push(card.category.toLowerCase())
      })
    })

    this.categoriesCard = this.categoriesService.categoriesData
      .sort((a, b) => a.heading.localeCompare(b.heading))
      .map(category => ({
        ...category,
        color: this.generatePastelColor()
      }));
  }

  isCategoryAvailable(category: string): boolean {
    return this.availableCategories.includes(category.toLowerCase());
  }

  generatePastelColor(): string {
    const r = Math.floor((Math.random() * 127) + 127);
    const g = Math.floor((Math.random() * 127) + 127);
    const b = Math.floor((Math.random() * 127) + 127);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  openCategory(category: string) {
    this.categoriesService.navigateToCategory(category);
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }



}
