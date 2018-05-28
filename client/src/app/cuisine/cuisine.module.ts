import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CuisineComponent} from './cuisine.component';
import {CuisineService} from './shared/cuisine.service';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatGridListModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule

  ],
  declarations: [CuisineComponent],
  providers: [CuisineService],
  exports: [CuisineComponent]
})
export class CuisineModule { }
