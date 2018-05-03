import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule, MatIconModule, MatInputModule, MatTabsModule} from '@angular/material';
import { RegisterComponent } from './login/register/register.component';
import {LoginModule} from './login/login.module';

@NgModule({
  imports: [
    CommonModule,


    LoginModule
  ],
  declarations: [],
  exports: []
})
export class SharedModule { }
