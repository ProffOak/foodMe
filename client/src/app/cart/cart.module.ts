import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from './shared/cart.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [CartService]
})
export class CartModule { }
