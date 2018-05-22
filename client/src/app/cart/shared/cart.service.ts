import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Cart} from './cart.model';
import {ObjectService} from '../../core/database/object.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Recipe} from '../../recipes/shared/recipe.model';
import {switchMap} from 'rxjs/operators';

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
    this.authService.user$.pipe(
      switchMap(user => {
        this.currentUser = user;
        if (user) {
          // Get cart from databse based on the CurrentUser's uid
          return this.getObjectsByQuery({uid: user.uid});
        } else {
          // If no user signed in return null
          return of(null);
        }
      })).subscribe((cart: Cart[]) => {
      if (cart && cart[0]) {
        this.currentCart = cart[0];
        this.cartSubject.next(cart[0]);
      } else {
        // Reset cart and emit null
        this.currentCart = <Cart>{date: new Date(), recipeIds: []};
        this.cartSubject.next(this.currentCart);
      }
    });
  }

  addToCart(recipe: Recipe): Observable<Cart> {
    // Check if current user is logged in
    if (this.currentUser) {
      this.currentCart.uid = this.currentUser.uid;
    }
    this.currentCart.recipeIds.push(recipe._id);
    // Output the updated cart as next
    this.cartSubject.next(this.currentCart);
    // Update the cart in the database if user is logged in
    if (this.currentUser) {
      return this.patchObject(this.currentCart, {uid: this.currentCart.uid});
    } else {
      return this.cartSubject.asObservable();
    }
  }

  removeFromCart(recipeId: string): Observable<Cart> {
    this.currentCart.recipeIds.splice(this.currentCart.recipeIds.indexOf(recipeId), 1);
    // Output the updated value
    this.cartSubject.next(this.currentCart);
    // Update the cart in the database
    if (this.currentUser) {
      return this.patchObject(this.currentCart, {uid: this.currentCart.uid});
    } else {
      return this.cartSubject.asObservable();
    }

  }

}
