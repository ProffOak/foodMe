import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../recipes/shared/recipe.service';
import {AuthService} from '../../core/auth/auth.service';
import {Observable} from 'rxjs/index';
import {Recipe} from '../../recipes/shared/recipe.model';

@Component({
  selector: 'app-recipe-admin',
  templateUrl: './recipe-admin.component.html',
  styleUrls: ['./recipe-admin.component.scss']
})
export class RecipeAdminComponent implements OnInit {

  // recipiesObs: Observable<Recipe[]>;

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, authService: AuthService) { }

  ngOnInit() {
    // this.recipiesObs = this.recipeService.getRecipes();
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  recipeDeleted(index: number) {
    this.recipes.splice(index, 1);
  }

}
