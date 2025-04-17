import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class NavComponent {

  constructor(private router: Router) { }

  imgLogo = {
    url: '../../../assets/logo.png',
    alt : 'olx logo',
  }

  openMainPage() {
    this.router.navigate(['/']);
  }

}
