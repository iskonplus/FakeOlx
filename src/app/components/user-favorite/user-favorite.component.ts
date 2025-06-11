import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from '../../shared/card/card.service';


@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrl: './user-favorite.component.scss'
})
export class UserFavoriteComponent implements OnInit, OnDestroy {

  favoritesSubscription!: Subscription;
  favoritesCardId!: number[];

  constructor(private cardService: CardService) { }


  ngOnInit(): void {
    this.favoritesSubscription = this.cardService.favorites$.subscribe(favId => {
      this.favoritesCardId = favId;
    });

  }

  ngOnDestroy(): void {
    this.favoritesSubscription?.unsubscribe();
  }

}
