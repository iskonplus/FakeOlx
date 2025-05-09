import { Component } from '@angular/core';
import { CardService } from '../../shared/card/card.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss'
})
export class UserCartComponent {

  userCart$ = this.cardService.userCart$;

  constructor(private cardService: CardService) { }

}
