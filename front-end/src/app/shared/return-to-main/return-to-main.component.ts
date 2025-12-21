import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-to-main',
  templateUrl: './return-to-main.component.html',
  styleUrl: './return-to-main.component.scss'
})
export class ReturnToMainComponent {
  constructor(private router: Router) { }


  returnToMainPage() {
    this.router.navigate(['/']);
  }

}
