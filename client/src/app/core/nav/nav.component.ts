import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLoggedInObs: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    // this.isLoggedInObs = this.authService.isLoggedIn();
    this.authService.user$.subscribe(res => {
      console.log(res);
    });
    this.authService.isLoggedInObs().subscribe(res => console.log(res));
  }

  onLogoutClick() {
    this.authService.signOut();
  }
}
