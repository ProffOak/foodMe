import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {CuisineModule} from './cuisine/cuisine.module';
import {RecipeModule} from './recipes/recipe.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Own modules
    CuisineModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    RecipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
