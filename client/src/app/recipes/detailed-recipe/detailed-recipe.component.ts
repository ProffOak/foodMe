import { Component, OnInit } from '@angular/core';
import { RecipeService} from "../shared/recipe.service";
import {Recipe} from "../shared/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../cart/shared/cart.service";

@Component({
  selector: 'app-detailed-recipe',
  templateUrl: './detailed-recipe.component.html',
  styleUrls: ['./detailed-recipe.component.scss']
})
export class DetailedRecipeComponent implements OnInit {

  constructor(private recipeService : RecipeService, private route: ActivatedRoute, private router: Router, private cartService: CartService) { }

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
    this.cartService.addToCart(this.recipe);
    this.router.navigate(['/recipes']);
}

}
