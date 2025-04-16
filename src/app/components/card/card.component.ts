import { Component, Input } from '@angular/core';
import { Card } from '../../types/card';
import { Observable, delay, filter, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() product!: Card;
  isMoreInformation: Boolean = false;
  isCardLike: Boolean = false;
  typeFavoriteIcon = 'favorite_border';

  addToFavorite() {
    this.isCardLike = !this.isCardLike;
    this.typeFavoriteIcon = this.isCardLike ? 'favorite' : 'favorite_border';
  }

  constructor() {}

}


