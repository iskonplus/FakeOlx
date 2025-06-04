import { ActiveUser } from './../../types/active-user';
import { LoginService } from './../login-page/services/login.service';
import { ErrorService } from './../../shared/httpError/error.service';
import { ProductsService } from './../../services/products.service';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-create-ads-page',
  templateUrl: './create-ads-page.component.html',
  styleUrl: './create-ads-page.component.scss'
})
export class CreateAdsPageComponent implements OnInit {

  newProduct: Product = {
    title: '', description: '', image: '', category: '', price: 0, id: 0,
    rating: {
      rate: 0,
      count: 0
    }
  };
  categories: string[] = [];
  isSpinnerActive = false;
  updateUserAdsSubscription?: Subscription;
  userId!: string;


  constructor(private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private errorService: ErrorService,
    private loginService: LoginService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.categoriesService.categoriesData.forEach(el => this.categories.push(el.heading))
    this.loginService.activeUser$.forEach(state => state.isLoggedIn && (this.userId = state.user.id));

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

    this.newProduct.title = this.createAdsForm.get('title')?.value ?? '';
    this.newProduct.description = this.createAdsForm.get('description')?.value ?? '';
    this.newProduct.image = this.createAdsForm.get('imageUrl')?.value ?? '';
    this.newProduct.category = this.createAdsForm.get('category')?.value ?? '';
    this.newProduct.price = this.createAdsForm.get('price')?.value ?? 0;
    this.newProduct.id = this.productsService.generateUniqueId()


    this.updateUserAdsSubscription = this.productsService.updateUserAds(this.newProduct, this.userId).subscribe(
      {
        next: _ => this.router.navigate(['/']),
        error: err => { this.errorService.handleError(err.message), this.isSpinnerActive = false },
        complete: () => this.isSpinnerActive = false
      }
    )

  }



  ngOnDestroy(): void {
    this.updateUserAdsSubscription?.unsubscribe();

  }

}
