import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  imgLogo = {
    url: '../../../assets/logo_footer.png',
    alt : 'olx logo',
  }
}
