import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewProduct } from '../../types/new-product';

@Component({
  selector: 'app-create-ads-page',
  templateUrl: './create-ads-page.component.html',
  styleUrl: './create-ads-page.component.scss'
})
export class CreateAdsPageComponent implements OnInit {

  newProduct: NewProduct = { title: '', description: '', imageUrl: '', category: '', price: 0 };
  categories: string[] = [];
  isSpinnerActive = false;


  constructor(private categoriesService: CategoriesService) { }
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
    this.newProduct.title = this.createAdsForm.get('title')?.value ?? '';
    this.newProduct.description = this.createAdsForm.get('description')?.value ?? '';
    this.newProduct.imageUrl = this.createAdsForm.get('imageUrl')?.value ?? '';
    this.newProduct.category = this.createAdsForm.get('category')?.value ?? '';
    this.newProduct.price = this.createAdsForm.get('price')?.value ?? 0;
    console.log(this.newProduct);
    setInterval(() => { this.isSpinnerActive = false; }, 5000);
  }

}
