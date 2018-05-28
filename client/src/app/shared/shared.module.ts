import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ProfileComponent } from './profile/profile.component';
import { AddNewLinesPipe } from './pipes/add-new-lines.pipe';

@NgModule({
  imports: [
    CommonModule,


    LoginModule
  ],
  declarations: [ProfileComponent, AddNewLinesPipe],
  exports: [AddNewLinesPipe]
})
export class SharedModule { }
