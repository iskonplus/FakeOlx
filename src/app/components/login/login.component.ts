import { ErrorService } from './../../shared/httpError/error.service';
import { forkJoin, Subscription } from 'rxjs';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../pages/login-page/services/login.service';
import { User } from '../../types/user';
import { Router } from '@angular/router';
import { CardService } from '../../shared/card/card.service';
import { ActiveUser } from '../../types/active-user';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userData: User = {
    name: '',
    email: '',
    password: ''
  };

  loginSubscription?: Subscription;
  loginDataSubscription?: Subscription;

  @Output() loginFailed = new EventEmitter<string>();
  @Output() showSpinner = new EventEmitter<void>();


  constructor(private loginService: LoginService,
    private router: Router,
    private cardService: CardService,
    private productService: ProductsService,
    private errorService: ErrorService
  ) { }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }
    this.showSpinner.emit();
    this.userData.email = this.loginForm.get('email')?.value ?? '';
    this.userData.password = this.loginForm.get('password')?.value ?? '';

    this.loginSubscription = this.loginService.userLogin(this.userData)
      .subscribe({
        next: user => {
          this.handleLoginSuccess(user[0]);
        },
        error: (err) => { this.showSpinner.emit(), this.loginFailed.emit('User ' + err.statusText + ', try again.') },
        complete: () => this.showSpinner.emit()
      })
  }


  handleLoginSuccess(user: ActiveUser) {
    this.loginService.setUser(user);

    const userAds$ = this.productService.getUserAds(user.id);
    const userCart$ = this.cardService.getUserCart(user.id);

    this.loginDataSubscription = forkJoin([userAds$, userCart$]).subscribe({
      next: ([userAds, userCart]) => {
        this.productService.setUserAds(userAds);
        this.cardService.setUserCart(userCart);
        this.router.navigate(['/']);
        this.loginForm.reset();
      },
      error: (err) => this.errorService.handleError(err.message)

    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    this.loginDataSubscription?.unsubscribe();
  }


}
