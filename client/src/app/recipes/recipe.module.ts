import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeFromComponent } from './create-recipe-from/create-recipe-from.component';
import {RecipeService} from './shared/recipe.service';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import {CartModule} from '../cart/cart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // Own Imports
    CartModule,

    // Material imports
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [CreateRecipeFromComponent, RecipeCardComponent],
  providers: [RecipeService]
})
export class RecipeModule { }
