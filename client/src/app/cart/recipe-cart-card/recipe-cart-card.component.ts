import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeService} from '../../recipes/shared/recipe.service';
import {Observable} from 'rxjs/index';
import {Recipe} from '../../recipes/shared/recipe.model';
import {CartService} from '../shared/cart.service';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';
import {take} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-cart-card',
  templateUrl: './recipe-cart-card.component.html',
  styleUrls: ['./recipe-cart-card.component.scss']
})
export class RecipeCartCardComponent implements OnInit {

  @Input() recipe: Recipe;

  @Input() removeFromDb = false;

  @Output() recipeDeleted = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService, private cartService: CartService,
              private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit() {
  }

  onRemoveClick(recipe: Recipe) {
    if (!this.removeFromDb) {
      this.cartService.removeFromCart(<string> recipe._id).pipe(take(1)).subscribe(() => {
        this.snackbarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Delete);

      });
    } else {
      this.recipeService.removeRecipe(recipe).pipe( take(2)).subscribe(res => {
        console.log(res);
        this.recipeDeleted.emit(recipe);
        this.snackbarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Delete);
      });

    }

  }

  viewDetails() {
    this.router.navigate([`/recipes/${this.recipe._id}`]);
  }
}
