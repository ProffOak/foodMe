import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatTabsModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register/register.component';
import { EmailComponent } from './email/email.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule
  ],
  declarations: [LoginComponent, RegisterComponent, EmailComponent, SocialComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
