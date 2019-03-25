import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, merge} from 'rxjs';
import {Cart} from './cart.model';
import {ObjectService} from '../../core/database/object.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Recipe} from '../../recipes/shared/recipe.model';
import {RecipeService} from '../../recipes/shared/recipe.service';
import {toArray, flatMap, switchMap, take, tap} from 'rxjs/operators';
import {FirestoreService} from '../../core/database/firestore.service';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class CartService extends ObjectService<Cart> {

  private currentCart = <Cart>{date: new Date(), recipeIds: []};

  private cartSubject = new BehaviorSubject<Cart>(null);

  // private currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService, private recipeService: RecipeService,
              private firestoreService: FirestoreService<Cart>) {
    super(http, 'carts', firestoreService);
    // this.initializeCart();
  }






}
