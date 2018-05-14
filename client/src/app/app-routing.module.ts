import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {ProfileComponent} from './shared/profile/profile.component';
import {CreateRecipeFromComponent} from './recipes/create-recipe-from/create-recipe-from.component';
import {RecipeCardComponent} from './recipes/recipe-card/recipe-card.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'recipes/add', component: CreateRecipeFromComponent },
  { path: 'recipes', component: RecipeCardComponent}


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
