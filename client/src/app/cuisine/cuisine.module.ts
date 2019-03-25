import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CuisineComponent} from './cuisine.component';
import {CuisineService} from './shared/cuisine.service';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatGridListModule, MatIconModule, MatInputModule} from '@angular/material';
import { CreateCuisineFormComponent } from './create-cuisine-form/create-cuisine-form.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule

  ],
  declarations: [CuisineComponent, CreateCuisineFormComponent],
  providers: [CuisineService],
  exports: [CuisineComponent]
})
export class CuisineModule { }
