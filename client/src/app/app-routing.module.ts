import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {ProfileComponent} from './shared/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
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
