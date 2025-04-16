import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class NavComponent {
  imgLogo = {
    url: '../../../assets/logo.png',
    alt : 'olx logo',
  }

}
