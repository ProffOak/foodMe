import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeFromComponent } from './create-recipe-from/create-recipe-from.component';
import {RecipeService} from './shared/recipe.service';
import {FormsModule} from '@angular/forms';
import {
  MatListModule,
  MatExpansionModule,
  MatGridListModule,
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
import { DetailedRecipeComponent } from './detailed-recipe/detailed-recipe.component';
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // Own Imports
    CartModule,

    FlexLayoutModule,
    // Material imports
    MatGridListModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [CreateRecipeFromComponent, RecipeCardComponent, DetailedRecipeComponent],
  providers: [RecipeService]
})
export class RecipeModule { }
