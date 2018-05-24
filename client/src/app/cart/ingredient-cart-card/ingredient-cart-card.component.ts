import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipes/shared/recipe.model';

@Component({
  selector: 'app-ingredient-cart-card',
  templateUrl: './ingredient-cart-card.component.html',
  styleUrls: ['./ingredient-cart-card.component.scss']
})
export class IngredientCartCardComponent implements OnInit {

  @Input() recipes: Recipe[];
  constructor() { }

  ngOnInit() {
  }

}
