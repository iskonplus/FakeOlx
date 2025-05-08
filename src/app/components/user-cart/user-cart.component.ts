import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CardService } from '../../shared/card/card.service';
import { UserCart } from '../../types/user-cart';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss'
})
export class UserCartComponent implements OnInit {

  userCartSubscription!: Subscription;
  userCart: UserCart | null = null;


  constructor(private cardService: CardService,) { }

  ngOnInit(): void {
    this.userCartSubscription = this.cardService.userCart$.subscribe(userCart => {
      this.userCart = userCart;
    });

  }

  ngOnDestroy(): void {
    this.userCartSubscription.unsubscribe();
  }

}
