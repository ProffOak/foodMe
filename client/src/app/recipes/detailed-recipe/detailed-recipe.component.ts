import {Component, OnDestroy, OnInit} from '@angular/core';
import { RecipeService} from "../shared/recipe.service";
import {Recipe} from "../shared/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../cart/shared/cart.service";
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-detailed-recipe',
  templateUrl: './detailed-recipe.component.html',
  styleUrls: ['./detailed-recipe.component.scss']
})
export class DetailedRecipeComponent implements OnInit, OnDestroy {

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router,
              private cartService: CartService, private snackBarService: SnackbarService) { }

  recipeLoaded = false;
  recipe: Recipe;

  recipeSub: Subscription;

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.recipeService.getRecipeById(this.route.snapshot.params['id']).subscribe(recipe => {
      this.recipe = recipe;
      this.recipeLoaded = true;
      console.log(recipe);
    });

  }

  nextRecipe() {
    this.router.navigate(['/recipes']);
  }

  addRecipe() {
    this.cartService.addToCart(this.recipe);
    this.snackBarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.AddedToCart);
    this.router.navigate(['/recipes']);
}

  ngOnDestroy(): void {

  }

}
