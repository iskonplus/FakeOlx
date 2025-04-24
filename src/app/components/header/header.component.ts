import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../pages/login-page/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class NavComponent {

  activeUser$ = this.loginService.activeUser$;
  isUserLogin = false;


  constructor(private router: Router, private loginService: LoginService) {
    console.log(this.activeUser$);

  }


  imgLogo = {
    url: '../../../assets/logo.png',
    alt : 'olx logo',
  }

  openMainPage() {
    this.router.navigate(['/']);
  }

  submitAds() {
    this.isUserLogin = this.loginService.getUserFromStorage();
    if (!this.isUserLogin) {
      this.router.navigate(['login']);
    } else {
      console.log("loading ads page");
    }
  }



}
