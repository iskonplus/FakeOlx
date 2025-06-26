import { CategoriesService } from './../../services/categories.service';
import { LoginService } from './../../pages/login-page/services/login.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../types/product';
import { CardService } from './card.service';
import { Subscription } from 'rxjs';
import { UserCart } from '../../types/user-cart';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() product!: Product;
  @Input() isMoreInformation = false;
  @Output() showDetails: EventEmitter<Product> = new EventEmitter<Product>();

  isCardLike: boolean = false;
  typeFavoriteIcon = 'favorite_border';
  isUserAd = false;
  userId: string = '';
  isCardInCart = false;
  userCart!: UserCart;


  private favoriteSub!: Subscription;
  private userSub!: Subscription;

  constructor(
    private cardService: CardService,
    private loginService: LoginService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.userSub = this.loginService.activeUser$.subscribe(userState => {
      if (userState?.isLoggedIn) {
        this.userId = userState.user.id;
        this.cardService.setCurrentUser(this.userId);
      }
    });


    this.favoriteSub = this.cardService.favorites$.subscribe(favIds => {
      this.isCardLike = favIds.includes(this.product.id);
      this.typeFavoriteIcon = this.isCardLike ? 'favorite' : 'favorite_border';
    });


  }

  addToFavorite(event: Event): void {
    event.stopPropagation();

    if (!this.userId) return;
    this.cardService.setCurrentUser(this.userId);
    this.cardService.toggleFavorite(this.product.id);
  }

  showMoreDetails(): void {
    this.showDetails.emit(this.product);
  }

  openCategory(category: string, event: Event) {
    event.preventDefault();
    this.categoriesService.navigateToCategory(category);
  }

  ngOnDestroy(): void {
    this.favoriteSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}


