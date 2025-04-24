import { Component } from '@angular/core';
import { LoginService } from '../login-page/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  constructor(private loginService: LoginService, private router: Router ) {}

  activeUser$ = this.loginService.activeUser$;

  logOut() {
    this.loginService.clearUser();
    this.router.navigate(['/']);

  }

}
