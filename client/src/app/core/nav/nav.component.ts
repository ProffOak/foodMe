import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {CartService} from '../../cart/shared/cart.service';
import {Cart} from '../../cart/shared/cart.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLoggedIn = false;
  cartObs: Observable<Cart>;

  constructor(public authService: AuthService, private cartService: CartService) { }

  ngOnInit() {
    this.cartObs = this.cartService.currentCartObs;
    this.authService.isLoggedInObs().subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  onLogoutClick() {
    this.authService.signOut();
  }
}
