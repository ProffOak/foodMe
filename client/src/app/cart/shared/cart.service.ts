import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, merge} from 'rxjs';
import {Cart} from './cart.model';
import {ObjectService} from '../../core/database/object.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Recipe} from '../../recipes/shared/recipe.model';
import {RecipeService} from '../../recipes/shared/recipe.service';
import {toArray, flatMap, switchMap, take, tap, map} from 'rxjs/operators';
import {FirestoreService} from '../../core/database/firestore.service';

@Injectable()
export class CartService extends ObjectService<Cart> {

  private currentCart = <Cart>{date: new Date(), recipeIds: []};

  private cartSubject = new BehaviorSubject<Cart>(null);

  // private currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService, private recipeService: RecipeService,
              private firestoreService: FirestoreService<Cart>) {
    super(http, 'carts', firestoreService);

    this.initializeCart();
  }

  private initializeCart() {
    this.authService.user$.pipe(switchMap(user => {
      if (user) {
        this.currentCart.uid = user.uid;
        return this.getObjectsByQuery(ref => ref.where('uid', '==', user.uid)).pipe(map(carts => carts[0]));
      }
      // Reset Cart if user logs out
      return of(<Cart>{date: new Date(), recipeIds: []});
    })).subscribe(cart => {
      if (cart) {
        this.currentCart = cart;
      }
      // Send out new cart Value
      this.cartSubject.next(this.currentCart);
    });
  }


  get currentCartObs(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addToCart(recipe: Recipe): Promise<Cart> {
    this.currentCart.recipeIds.push(<string>recipe._id);
    return this.updateCartInDatabase();
  }

  removeFromCart(recipeId: string): Promise<Cart> {
    this.currentCart.recipeIds.splice(this.currentCart.recipeIds.indexOf(recipeId), 1);
    // Output the updated value
    return this.updateCartInDatabase();
  }

  removeAllFromCart(): Promise<Cart> {
    // Remove all recipes from cart
    this.currentCart.recipeIds = [];
    return this.updateCartInDatabase();
  }

  private updateCartInDatabase(): Promise<Cart> {
    return this.authService.user$.pipe(switchMap(user => {
      if (user) {
        return this.patchObject(this.currentCart, this.currentCart._id);
      } else {
        this.cartSubject.next(this.currentCart);
        return of(this.currentCart);
      }
    })).toPromise();


  }

  getCurrentRecipes(): Observable<Recipe[]> {
    return this.currentCartObs.pipe(switchMap(cart => {
      if (!cart) { return of (null); }
      const arr = <[Observable<Recipe>]> [];
      for (const id of cart.recipeIds) {
        arr.push(this.recipeService.getRecipeById(<string>id));
      }
      return merge(...arr).pipe(
        take(arr.length),
        toArray(),
      );
    }));
  }



}
