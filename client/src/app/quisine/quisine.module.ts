import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuisineComponent} from "./quisine.component";
import {QuisineService} from "./quisine.service";
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [
    MatButtonModule,
    CommonModule
  ],
  declarations: [QuisineComponent],
  providers: [QuisineService],
  exports: [QuisineComponent]
})
export class QuisineModule { }
