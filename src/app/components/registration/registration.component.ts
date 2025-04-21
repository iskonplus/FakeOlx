import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../pages/login-page/services/login.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  userData: User = {
    email: '',
    password: ''
  };


 @Output() registrationFailed = new EventEmitter<string>();

  constructor(private loginService: LoginService) { }

  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    // password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    acceptTerms: new FormControl('', [Validators.requiredTrue]),
  });


  submit() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.userData.email = this.loginForm.get('email')?.value ?? '';
    this.userData.password = this.loginForm.get('password')?.value ?? '';

    // const acceptTerms = this.loginForm.get('acceptTerms')?.value;


    this.loginService.userRegistration(this.userData).subscribe({
      next: data => console.log('resolve: ', data),
      error: (err) => this.registrationFailed.emit(err.statusText + ', try again.'),
      complete: () => console.log('first observable complied')
    })



    this.loginForm.reset({
      email: '',
      password: '',
      acceptTerms: ''
    });


    Object.keys(this.loginForm.controls).forEach(controlName => {
      this.loginForm.get(controlName)?.setErrors(null);
    });

  }

}
