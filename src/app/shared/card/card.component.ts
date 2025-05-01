import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../types/product';
import { CardService } from './card.service';
import { Subscription } from 'rxjs';

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
  private favoriteSub!: Subscription;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.favoriteSub = this.cardService.favorites$.subscribe(favIds => {
      this.isCardLike = favIds.includes(this.product.id);
      this.typeFavoriteIcon = this.isCardLike ? 'favorite' : 'favorite_border';
    });
  }

  addToFavorite(event: Event) {
    event.stopPropagation();
    this.cardService.toggleFavorite(this.product.id);
    this.isCardLike = this.cardService.isFavorite(this.product.id);
    this.typeFavoriteIcon = this.isCardLike ? 'favorite' : 'favorite_border';
  }


  showMoreDetails() {
    this.showDetails.emit(this.product);
  }

  ngOnDestroy(): void {
    this.favoriteSub?.unsubscribe();
  }

}


