import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import { QuisineComponent} from "./quisine/quisine.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quisine', component : QuisineComponent}
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
