import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../shared/cart.service';
import {Observable, Subscription} from 'rxjs/index';
import {Cart} from '../shared/cart.model';
import {Recipe} from '../../recipes/shared/recipe.model';
import {RecipeService} from '../../recipes/shared/recipe.service';
import {MatTabGroup} from '@angular/material';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit, OnDestroy {


  @ViewChild('tab') private tabRef: MatTabGroup;



  recipesSub: Subscription;

  recipes: Recipe[];

  constructor(private cartService: CartService, private snackbarService: SnackbarService) { }

  ngOnInit() {
    // this.recipesObs = this.cartService.getCurrentRecipes();
    this.recipesSub = this.cartService.getCurrentRecipes().subscribe(recipes => {
      this.recipes = [];
      this.recipes = recipes;
    });
  }

  toIngredients() {
    this.tabRef.selectedIndex = 1;
  }

  onPurchaseClick() {
    this.snackbarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Custom, 'Tack för din beställning!');
    this.cartService.removeAllFromCart().subscribe(() => {

    });


  }

  // Unsubscribe from recipes when component is destroyed to avoid multiple subs
  ngOnDestroy(): void {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }
  }
}
