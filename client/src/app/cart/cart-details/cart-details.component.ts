import { Component, OnInit } from '@angular/core';
import {CartService} from '../shared/cart.service';
import {Observable} from 'rxjs/index';
import {Cart} from '../shared/cart.model';
import {Recipe} from '../../recipes/shared/recipe.model';
import {switchMap} from 'rxjs/internal/operators';
import {RecipeService} from '../../recipes/shared/recipe.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartObs: Observable<Cart>;
  recipesObs: Observable<Recipe[]>;

  recipes: Recipe[];
  ingredients = [];

  constructor(private cartService: CartService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.cartObs = this.cartService.currentCartObs;
    // this.recipesObs = this.cartService.getCurrentRecipes();
    this.cartService.getCurrentRecipes().subscribe(recipes => {
      this.recipes = [];
      this.recipes = recipes;
    });
  }

}
