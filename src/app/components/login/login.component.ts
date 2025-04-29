import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../pages/login-page/services/login.service';
import { User } from '../../types/user';
import { Router } from '@angular/router';


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


  @Output() loginFailed = new EventEmitter<string>();
  @Output() showSpinner = new EventEmitter<void>();


  constructor(private loginService: LoginService, private router: Router) { }


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

    this.loginService.userLogin(this.userData)
      .subscribe({
        next: user => {
          console.log(user[0]);
          this.loginService.setUser(user[0]);

          this.router.navigate(['/']);
        },
        error: (err) => {this.showSpinner.emit(), this.loginFailed.emit('User ' + err.statusText + ', try again.')},
        complete: () => {this.showSpinner.emit(), this.loginForm.reset()}
      })



    Object.keys(this.loginForm.controls).forEach(controlName => {
      this.loginForm.get(controlName)?.setErrors(null);
    });
  }


}
