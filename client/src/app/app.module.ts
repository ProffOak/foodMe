import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import {HeroModule} from './hero/hero.module';
import { QuisineComponent } from './quisine/quisine.component';


@NgModule({
  declarations: [
    AppComponent,
    QuisineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Own modules
    AppRoutingModule,
    CoreModule,
    HeroModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
