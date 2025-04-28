import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../types/card';
import { Observable, delay, filter, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() product!: Card;
  @Output() showDetails: EventEmitter<number> = new EventEmitter<number>();

  isMoreInformation: Boolean = false;
  isCardLike: Boolean = false;
  typeFavoriteIcon = 'favorite_border';

  constructor() { }

  addToFavorite() {
    this.isCardLike = !this.isCardLike;
    this.typeFavoriteIcon = this.isCardLike ? 'favorite' : 'favorite_border';
  }


  showMoreDetails(id:number) {
    this.showDetails.emit(id);
  }

}


