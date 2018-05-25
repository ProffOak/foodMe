import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../shared/recipe.service';
import {Recipe} from '../shared/recipe.model';
import {CartService} from '../../cart/shared/cart.service';
import {Observable} from 'rxjs';
import {Cart} from '../../cart/shared/cart.model';
import {Router} from "@angular/router";
import {QuisineService} from "../../quisine/quisine.service";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  currentRecipe: Recipe;
  recipes: Recipe[];
  numberOfRecipesPerLoad: 20;

  cartObs: Observable<Cart>;

  constructor(private recipeService: RecipeService, private cartService: CartService, private router: Router, private quisineService: QuisineService) { }

  private getRandomRecipes() {
    this.recipeService.getRandomQuisineRecipes(this.numberOfRecipesPerLoad, this.quisineService.getQuisindeIdArray() ).subscribe(recipes => {
      this.recipes = recipes;
      this.currentRecipe = this.recipes.pop();
      //console.log(this.currentRecipe.quisines[0].name);
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
    this.cartService.addToCart(this.currentRecipe).subscribe(res => {
    });
    this.nextRecipe();
  }

  deleteRecipe(item){
    this.cartService.removeFromCart(item).subscribe(res => {
    });
  }

  moreInfo() {
    this.router.navigate(['recipes/' + this.currentRecipe._id]);
  }
}
