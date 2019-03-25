import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../shared/recipe.service';
import {Recipe} from '../shared/recipe.model';
import {CartService} from '../../cart/shared/cart.service';
import {Observable} from 'rxjs';
import {Cart} from '../../cart/shared/cart.model';
import {Router} from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import * as kf from '../../shared/keyframes';
import {CuisineService} from '../../cuisine/shared/cuisine.service';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';
import {Subscription} from 'rxjs/internal/Subscription';
import {map, take, tap} from 'rxjs/operators';


@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => wobble', animate(1000, keyframes(kf.wobble))),
      transition('* => swing', animate(1000, keyframes(kf.swing))),
      transition('* => jello', animate(1000, keyframes(kf.jello))),
      transition('* => zoomOutRight', animate(600, keyframes(kf.zoomOutRight))),
      transition('* => slideOutLeft', animate(400, keyframes(kf.slideOutLeft))),
      transition('* => rotateOutUpRight', animate(1000, keyframes(kf.rotateOutUpRight))),
      transition('* => flipOutY', animate(1000, keyframes(kf.flipOutY))),
    ])
  ]
})
export class RecipeCardComponent implements OnInit {

  currentRecipe: Recipe;
  recipes: Recipe[];
  numberOfRecipesPerLoad = 20;

  cartObs: Observable<Cart>;
  animationState: string;


  constructor(private recipeService: RecipeService, private cartService: CartService,
              private router: Router, private cuisineService: CuisineService, private snackbarService: SnackbarService) { }

  private getRandomRecipes() {
    this.recipeService
      .getRandomCuisineRecipes(this.numberOfRecipesPerLoad, this.cuisineService.getCuisineIdArray() ).subscribe(recipes => {
      this.recipes = recipes;
      this.shuffleArray(this.recipes);
      this.currentRecipe = this.recipes.pop();
    });
  }

  ngOnInit() {
    this.getRandomRecipes();
    this.cartObs = this.cartService.currentCartObs;
    if (this.cuisineService.getCuisineIdArray().length === 0) {
      this.router.navigate(['']);
    }
  }

  /*private loadCuisines() {
    this.cuisineService.getCuisinesFromIds(this.currentRecipe.cuisines)
      .pipe(
        take(1),
        tap(cuisines => {
          this.currentRecipe.cuisines = cuisines;
        })
      ).subscribe(() => {return});
  }*/


  nextRecipe() {
    // When out of recipes, get new ones
    if (this.recipes.length === 0) {
      console.log('Slut på Recept!!');
      this.getRandomRecipes();
    } else {
      this.currentRecipe = this.recipes.pop();
    }
  }


  onAddClick() {
    this.cartService.addToCart(this.currentRecipe).then(() => {
    });
    this.nextRecipe();
  }

  // Check swipe direction, and add if right, pass if left
  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }
    if (state === 'slideOutLeft') {
      setTimeout(() => {this.nextRecipe(); }, 100);
    }
    if (state === 'zoomOutRight') {
      setTimeout(() => {this.onAddClick(); }, 200);
      this.snackbarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.AddedToCart);
    }
  }


  resetAnimationState() {
    this.animationState = '';
  }

  moreInfo() {
    this.router.navigate(['recipes/' + this.currentRecipe._id]);
  }

  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
