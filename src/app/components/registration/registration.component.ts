import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    acceptTerms: new FormControl('', [Validators.requiredTrue]),
  });


  submit() {


    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }


    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const acceptTerms = this.loginForm.get('acceptTerms')?.value;

    console.log(this.loginForm.value);
    
    this.loginForm.reset({
      email: '',
      password: '',
      acceptTerms: ''
    });


  Object.keys(this.loginForm.controls).forEach(controlName => {
    this.loginForm.get(controlName)?.setErrors(null);
  });

    // Authenticate with an API or Google Firebase Auth
  }

}
