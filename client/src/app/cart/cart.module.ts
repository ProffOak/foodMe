import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from './shared/cart.service';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { RecipeCartCardComponent } from './recipe-cart-card/recipe-cart-card.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatListModule, MatTabsModule} from '@angular/material';
import { IngredientCartCardComponent } from './ingredient-cart-card/ingredient-cart-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    FlexLayoutModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule
  ],
  declarations: [CartDetailsComponent, RecipeCartCardComponent, IngredientCartCardComponent],
  providers: [CartService],
  exports: [CartDetailsComponent, RecipeCartCardComponent]
})
export class CartModule { }
