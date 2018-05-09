import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginModule} from './login/login.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,


    LoginModule
  ],
  declarations: [ProfileComponent],
  exports: []
})
export class SharedModule { }
