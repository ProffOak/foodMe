import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../core/auth/shared/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogin(user: Observable<User>) {
    user.take(1).subscribe(res => {
      this.router.navigate(['']);
    });
  }

}
