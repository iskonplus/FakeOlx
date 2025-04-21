import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../pages/login-page/services/login.service';
import { User } from '../../types/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userData: User = {
    email: '',
    password: ''
  };


  @Output() loginFailed = new EventEmitter<string>();

  constructor(private loginService: LoginService) { }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.userData.email = this.loginForm.get('email')?.value ?? '';
    this.userData.password = this.loginForm.get('password')?.value ?? '';;

    this.loginService.userLogin(this.userData)
      .subscribe({
        next: data => console.log('resolve: ', data),
        error: (err) => this.loginFailed.emit('User ' + err.statusText + ', try again.'),
        complete: () => console.log('first observable complied')
      })



    this.loginForm.reset();

    Object.keys(this.loginForm.controls).forEach(controlName => {
      this.loginForm.get(controlName)?.setErrors(null);
    });
  }


}
