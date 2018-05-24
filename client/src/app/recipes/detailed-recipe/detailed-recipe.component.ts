import { Component, OnInit } from '@angular/core';
import { RecipeService} from "../shared/recipe.service";
import {Recipe} from "../shared/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-detailed-recipe',
  templateUrl: './detailed-recipe.component.html',
  styleUrls: ['./detailed-recipe.component.scss']
})
export class DetailedRecipeComponent implements OnInit {

  constructor(private recipeService : RecipeService, private route: ActivatedRoute, private router: Router) { }

  recipeLoaded = false;
  recipe: Recipe;

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.recipeService.getRecipeById(this.route.snapshot.params['id']).subscribe(recipe => {
      this.recipe=recipe;
      this.recipeLoaded=true;
      console.log(recipe);
    });

  }

  nextRecipe(){
    this.router.navigate(['/recipes']);
  }

  addRecipe() {
    this.router.navigate(['/recipes']);
}

}
