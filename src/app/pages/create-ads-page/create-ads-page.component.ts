import { ErrorService } from './../../shared/httpError/error.service';
import { ProductsService } from './../../services/products.service';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewProduct } from '../../types/new-product';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ads-page',
  templateUrl: './create-ads-page.component.html',
  styleUrl: './create-ads-page.component.scss'
})
export class CreateAdsPageComponent implements OnInit {

  newProduct: NewProduct = { title: '', description: '', image: '', category: '', price: 0 };
  categories: string[] = [];
  isSpinnerActive = false;
  createProductSubscription!: Subscription;


  constructor(private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private errorService: ErrorService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.categoriesService.categoriesData.forEach(el => this.categories.push(el.heading))

  }

  createAdsForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
  });

  submit() {

    this.isSpinnerActive = true;
    this.newProduct = {
      title: this.createAdsForm.get('title')?.value ?? '',
      description: this.createAdsForm.get('description')?.value ?? '',
      image: this.createAdsForm.get('imageUrl')?.value ?? '',
      category: this.createAdsForm.get('category')?.value ?? '',
      price: this.createAdsForm.get('price')?.value ?? 0,
    };

    this.createProductSubscription = this.productsService.createProduct(this.newProduct).subscribe(
      {
        next: _ => this.router.navigate(['/']),
        error: err => {this.errorService.handleError(err.message), this.isSpinnerActive = false},
        complete: () => this.isSpinnerActive = false
      }
    )

  }



  ngOnDestroy(): void {
    if (this.createProductSubscription) {
      this.createProductSubscription.unsubscribe();
    }
  }

}
