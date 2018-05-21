import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuisineComponent} from "./quisine.component";
import {QuisineService} from "./quisine.service";
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatGridListModule} from "@angular/material";


@NgModule({
  imports: [
    MatButtonModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatGridListModule
  ],
  declarations: [QuisineComponent],
  providers: [QuisineService],
  exports: [QuisineComponent]
})
export class QuisineModule { }
