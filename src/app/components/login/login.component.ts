import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }


    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log(this.loginForm.value);

    this.loginForm.reset({
      email: '',
      password: ''
    });


  Object.keys(this.loginForm.controls).forEach(controlName => {
    this.loginForm.get(controlName)?.setErrors(null);
  });
    // Authenticate with an API or Google Firebase Auth
  }

}
