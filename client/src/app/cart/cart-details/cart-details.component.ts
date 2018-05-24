import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../shared/cart.service';
import {Observable} from 'rxjs/index';
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
export class CartDetailsComponent implements OnInit {


  @ViewChild('tab') private tabRef: MatTabGroup;


  cartObs: Observable<Cart>;

  recipes: Recipe[];

  constructor(private cartService: CartService, private snackbarStervie: SnackbarService) { }

  ngOnInit() {
    this.cartObs = this.cartService.currentCartObs;
    // this.recipesObs = this.cartService.getCurrentRecipes();
    this.cartService.getCurrentRecipes().subscribe(recipes => {
      this.recipes = [];
      this.recipes = recipes;
    });
  }

  toIngredients() {
    this.tabRef.selectedIndex = 1;
  }

  onPurchaseClick() {
    this.snackbarStervie.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Custom, 'Tack för din beställning!');
    this.cartService.removeAllFromCart().subscribe(() => {

    });


  }
}
