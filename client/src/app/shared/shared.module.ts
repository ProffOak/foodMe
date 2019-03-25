import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ProfileComponent } from './profile/profile.component';
import { AddNewLinesPipe } from './pipes/add-new-lines.pipe';
import {DropZoneComponent} from './drop-zone/drop-zone.component';
import {DropZoneDirective} from './directives/drop-zone.directive';
import {MatButtonModule, MatCardModule, MatListModule} from '@angular/material';
import {CartModule} from '../cart/cart.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CartModule,
    MatCardModule,
    MatListModule,


    LoginModule
  ],
  declarations: [ProfileComponent, AddNewLinesPipe, DropZoneComponent, DropZoneDirective],
  exports: [AddNewLinesPipe, DropZoneComponent, DropZoneDirective]
})
export class SharedModule { }
