import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import { QuisineComponent} from './quisine/quisine.component';
import {ProfileComponent} from './shared/profile/profile.component';
import {CreateRecipeFromComponent} from './recipes/create-recipe-from/create-recipe-from.component';
import {RecipeCardComponent} from './recipes/recipe-card/recipe-card.component';
import {DetailedRecipeComponent} from './recipes/detailed-recipe/detailed-recipe.component';
import {CartDetailsComponent} from './cart/cart-details/cart-details.component';
import {RecipeAdminComponent} from './recipes/recipe-admin/recipe-admin.component';

const routes: Routes = [
  { path: '', component: QuisineComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'recipes/add', component: CreateRecipeFromComponent },
  { path: 'recipes', component: RecipeCardComponent},
  { path: 'recipes/admin', component: RecipeAdminComponent},
  { path: 'recipes/:id', component: DetailedRecipeComponent},
  { path: 'cart', component: CartDetailsComponent},


];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
