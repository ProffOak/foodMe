import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {User} from '../../core/auth/shared/user.model';
import {Router} from '@angular/router';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private snackBarService: SnackbarService) { }

  ngOnInit() {
  }

  onLogin(user: Observable<User>) {
    user.pipe(take(1)).subscribe(res => {
      this.snackBarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Login);
      this.router.navigate(['']);
    });
  }

}
