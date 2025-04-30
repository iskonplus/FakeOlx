import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../types/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() product!: Product;
  @Output() showDetails: EventEmitter<number> = new EventEmitter<number>();

  isMoreInformation: Boolean = false;
  isCardLike: Boolean = false;
  typeFavoriteIcon = 'favorite_border';

  constructor() { }

  addToFavorite(event: Event) {
    event.stopPropagation();
    this.isCardLike = !this.isCardLike;
    this.typeFavoriteIcon = this.isCardLike ? 'favorite' : 'favorite_border';
  }


  showMoreDetails(id:number) {
    this.showDetails.emit(id);
  }

}


