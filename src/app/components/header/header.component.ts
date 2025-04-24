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



}
