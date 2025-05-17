import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../pages/login-page/services/login.service';
import { User } from '../../types/user';
import { Subscription } from 'rxjs';
import { ActiveUser } from '../../types/active-user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  userCartSubscription!: Subscription;
  userAdsSubscription!: Subscription;
  userRegistrationSubscription!: Subscription;

  userData: User = {
    name: '',
    email: '',
    password: ''
  };


  @Output() registrationFailed = new EventEmitter<string>();
  @Output() registrationSuccess = new EventEmitter<void>();
  @Output() showSpinner = new EventEmitter<void>();

  constructor(private loginService: LoginService) { }

  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$';

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    // password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    acceptTerms: new FormControl('', [Validators.requiredTrue]),
  });


  submit() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.showSpinner.emit();

    this.userData.name = this.loginForm.get('name')?.value ?? '';
    this.userData.email = this.loginForm.get('email')?.value ?? '';
    this.userData.password = this.loginForm.get('password')?.value ?? '';

    // const acceptTerms = this.loginForm.get('acceptTerms')?.value;


    this.userRegistrationSubscription = this.loginService.userRegistration(this.userData).subscribe({
      next: user => {
        this.createAdAndCart(user);
        this.registrationSuccess.emit();
      },
      error: (err) => this.registrationFailed.emit(err.statusText + ', try again.'),
      complete: () => {
        this.loginForm.reset({
          name: '',
          email: '',
          password: '',
          acceptTerms: ''
        }), this.showSpinner.emit()
      }
    })


    this.loginForm.reset();
  }

  createAdAndCart(user: ActiveUser) {
    this.userCartSubscription = this.loginService.createUserCart(user.id).subscribe();
    this.userAdsSubscription = this.loginService.createUserAds(user.id).subscribe()

  }


  ngOnDestroy(): void {
    this.userRegistrationSubscription && this.userRegistrationSubscription.unsubscribe();
    this.userCartSubscription && this.userCartSubscription.unsubscribe();
    this.userAdsSubscription && this.userAdsSubscription.unsubscribe();
  }

}
