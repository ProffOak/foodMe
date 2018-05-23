import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from './shared/cart.service';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { RecipeCartCardComponent } from './recipe-cart-card/recipe-cart-card.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule
  ],
  declarations: [CartDetailsComponent, RecipeCartCardComponent],
  providers: [CartService],
  exports: [CartDetailsComponent]
})
export class CartModule { }
