import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {RecipeAdminComponent} from './recipe-admin/recipe-admin.component';
import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatTabsModule} from '@angular/material';
import {CartModule} from '../cart/cart.module';
import { CuisineAdminComponent } from './cuisine-admin/cuisine-admin.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CartModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
    MatDividerModule,
    MatCardModule
  ],
  declarations: [AdminComponent, RecipeAdminComponent, CuisineAdminComponent]
})
export class AdminModule { }
