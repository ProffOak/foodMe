import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../../recipes/shared/recipe.service';
import {Observable} from 'rxjs/index';
import {Recipe} from '../../recipes/shared/recipe.model';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-recipe-cart-card',
  templateUrl: './recipe-cart-card.component.html',
  styleUrls: ['./recipe-cart-card.component.scss']
})
export class RecipeCartCardComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private cartService: CartService) { }

  ngOnInit() {
  }

  onRemoveClick(recipe: Recipe) {
    this.cartService.removeFromCart(<string> recipe._id).subscribe(() => {
    });
  }

}
