import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../core/auth/shared/user.model';
import {PasswordValidation} from './password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user= <User>{};
  registerForm: FormGroup;

  password: string;
  passwordRepeat: string;

  constructor(private fb: FormBuilder) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required]),
      email: new FormControl('', [
        Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required]),
      passwordRepeat: new FormControl('', [
        Validators.required])
    }, PasswordValidation.MatchPassword);
  }

  ngOnInit() {  }



}
