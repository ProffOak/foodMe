import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import {HeroModule} from './hero/hero.module';
import { QuisineComponent } from './quisine/quisine.component';
import {SharedModule} from './shared/shared.module';
import { HttpModule} from "@angular/http";
import {QuisineModule} from "./quisine/quisine.module";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    // Own modules
    QuisineModule,
    AppRoutingModule,
    CoreModule,
    HeroModule,
    SharedModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
