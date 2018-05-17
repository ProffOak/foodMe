import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Cart} from './cart.model';
import {ObjectService} from '../../core/database/object.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Recipe} from '../../recipes/shared/recipe.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CartService extends ObjectService<Cart> {

  private currentCart = <Cart>{date: new Date(), recipeIds: []};

  private cartSubject = new Subject<Cart>();

  private currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    super(http, 'carts');
    this.initializeCart();
  }

  get currentCartObs(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // Get the cart based on the User ID
  private initializeCart() {
    this.authService.user$.switchMap(user => {
      this.currentUser = user;
      return this.getObjectsByQuery({uid: user.uid});
    }).subscribe((cart: Cart[]) => {
      if (cart[0]) {
        this.cartSubject.next(cart[0]);
        this.currentCart = cart[0];
      }
    });
  }

  addToCart(recipe: Recipe): Observable<Cart> {
    if (this.currentUser) {
      this.currentCart.uid = this.currentUser.uid;
    }
    this.currentCart.recipeIds.push(recipe._id);
    // Output the updated cart as next
    this.cartSubject.next(this.currentCart);
    // Update the cart in the databse
    return this.patchObject(this.currentCart, {uid: this.currentCart.uid});
  }

  removeFromCart(recipeId: string): Observable<Cart> {
    this.currentCart.recipeIds.splice(this.currentCart.recipeIds.indexOf(recipeId), 1);
    // Output the updated value
    this.cartSubject.next(this.currentCart);
    // Update the cart in the database
    return this.patchObject(this.currentCart, {uid: this.currentCart.uid});
  }

}
