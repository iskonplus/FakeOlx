import { LoginService } from './../../pages/login-page/services/login.service';
import { Product } from './../../types/product';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  isAddToCart = false;
  isUserLogged = false;
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.activeUser$.forEach(state => this.isUserLogged = state.isLoggedIn);
  }

}
