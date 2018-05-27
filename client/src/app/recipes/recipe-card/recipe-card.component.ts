import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../shared/recipe.service';
import {Recipe} from '../shared/recipe.model';
import {CartService} from '../../cart/shared/cart.service';
import {Observable} from 'rxjs';
import {Cart} from '../../cart/shared/cart.model';
import {Router} from '@angular/router';
import {QuisineService} from '../../quisine/shared/quisine.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import * as kf from '../../shared/keyframes';


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
  numberOfRecipesPerLoad: 20;

  cartObs: Observable<Cart>;
  animationState: string;

  constructor(private recipeService: RecipeService, private cartService: CartService,
              private router: Router, private quisineService: QuisineService) { }

  private getRandomRecipes() {
    this.recipeService.getRandomQuisineRecipes(this.numberOfRecipesPerLoad,
      this.quisineService.getQuisindeIdArray() ).subscribe(recipes => {
      this.recipes = recipes;
      this.currentRecipe = this.recipes.pop();
      // console.log(this.currentRecipe.quisines[0].name);
    });
  }

  ngOnInit() {
    this.getRandomRecipes();
    this.cartObs = this.cartService.currentCartObs;
  }


  nextRecipe() {
    this.currentRecipe = this.recipes.pop();
    // When out of recipes, get new ones
    if (this.recipes.length === 0) {
      this.getRandomRecipes();
    }
  }


  onAddClick() {
    this.cartService.addToCart(this.currentRecipe).subscribe(() => {
    });
    this.nextRecipe();
  }

  startAnimation(state) {
    console.log(state);
    if (!this.animationState) {
      this.animationState = state;
    }
    if (state === 'slideOutLeft') {
      setTimeout(this.nextRecipe(), 200);
    }
    if (state === 'zoomOutRight') {
      setTimeout(this.onAddClick(), 500);
    }
  }


  resetAnimationState() {
    this.animationState = '';
  }

  moreInfo() {
    this.router.navigate(['recipes/' + this.currentRecipe._id]);
  }
}
