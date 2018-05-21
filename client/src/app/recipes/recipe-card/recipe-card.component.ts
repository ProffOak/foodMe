import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../shared/recipe.service';
import {Recipe} from '../shared/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  currentRecipe: Recipe;
  recipes: Recipe[];
  numberOfRecipesPerLoad: 20;

  constructor(private recipeService: RecipeService) { }

  private getRandomRecipes() {
    this.recipeService.getRandomRecipes(this.numberOfRecipesPerLoad).subscribe(recipes => {
      this.recipes = recipes;
      this.currentRecipe = this.recipes.pop();
    });
  }

  ngOnInit() {
    this.getRandomRecipes();
  }

  onCancelClick() {
    this.currentRecipe = this.recipes.pop();
    // When out of recipes, get new ones
    if (this.recipes.length === 0) {
      this.getRandomRecipes();
    }

  }

}
