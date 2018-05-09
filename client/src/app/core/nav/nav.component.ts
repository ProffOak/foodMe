import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLoggedIn = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    // this.isLoggedIn = this.authService.isLoggedIn();
    /*this.authService.user$.subscribe(res => {
      console.log(res);
    });*/
    this.authService.isLoggedInObs().subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  onLogoutClick() {
    this.authService.signOut();
  }
}
