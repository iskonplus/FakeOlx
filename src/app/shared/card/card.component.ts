import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../types/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() product!: Product;
  @Input() isMoreInformation = false;
  @Output() showDetails: EventEmitter<Product> = new EventEmitter<Product>();

  isCardLike: Boolean = false;
  typeFavoriteIcon = 'favorite_border';

  constructor() { }

  addToFavorite(event: Event) {
    event.stopPropagation();
    this.isCardLike = !this.isCardLike;
    this.typeFavoriteIcon = this.isCardLike ? 'favorite' : 'favorite_border';
  }


  showMoreDetails() {
    this.showDetails.emit(this.product);
  }

}


