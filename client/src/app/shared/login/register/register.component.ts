import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {User} from '../../../core/auth/shared/user.model';
import {PasswordValidation} from './password-validation';
import {AuthService} from '../../../core/auth/auth.service';
import {ErrorStateMatcher} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = <User>{};
  registerForm: FormGroup;

  // password: string;
  // passwordRepeat: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required]],
    },      {
      validator: PasswordValidation.MatchPassword
    });
  }


  get email() {
    return this.registerForm.get('email');
  }
  get name() {
    return this.registerForm.get('name');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordRepeat() {
    return this.registerForm.get('passwordRepeat');
  }

  ngOnInit() {  }

  onSubmit() {
    if (!this.registerForm.invalid && this.passwordRepeat.value === this.passwordRepeat.value) {
      this.user.email = this.email.value;
      this.user.name = this.name.value;
      this.authService.emailRegister(this.user, this.password.value).subscribe(res => console.log(res));
    }

  }



}
