import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import {User} from './shared/user.model';
import {Observable, pipe, from, of} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';

import {UserService} from './user.service';
import {Roles} from './shared/roles';


@Injectable()
export class AuthService {
  get user$(): Observable<User> {
    return this._user$;
  }

  // An Observable of current logged in user. If not logged in observable of null
  private _user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.setUserObs();
  }

  // Update the user Observable with the user from the database
  private setUserObs() {
    this._user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Return the user from own database
          return this.userService.getUserByUid(user.uid);
        } else {
          // Set user to null if not signed In
          return of(null);
        }
      }));
  }

  // Returns an Observable if user is signed in or not
  isLoggedInObs(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
        return user !== null;
      }));
  }

  ///// Login/Signup //////

  // Google provider
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Facebook provider
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Help fucntion to logiin with Social providers
  private oAuthLogin(provider): Observable<User> {
    return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
      switchMap((credential) => {
        // Return the updated user object from own DB
        return this.updateUserData(credential.user);
      }));
  }

  // Login user using email and password
  emailLogin(email: string, password: string): Observable<User> {
    return  from (this.afAuth.auth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(user => {
        // Return the updated user object from own DB
        return this.updateUserData(user);
      }));
  }

  // Register new user using email and password
  emailRegister(user: User, password: string): Observable<User> {
    return  from (this.afAuth.auth.createUserWithEmailAndPassword(user.email, password)).pipe(
      switchMap(res => {
        // Return a newly cratered user in the DB
        return this.createUser(res, <Roles>{regular: true}, user.name);
      }));
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  private updateUserData(user) {
    // Sets user data to DB on login
    const newUserData = <User>{
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.metadata.creationTime,
      lastLoginAt: user.metadata.lastSignInTime,
    };
    if (user.displayName) {
      newUserData.name = user.displayName;
    }
    return this.userService.patchObject(newUserData, {uid: newUserData.uid});
  }
  
  // Create a new User in DB
  private createUser(user, roles: Roles, name): Observable<User> {
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.metadata.creationTime,
      lastLoginAt: user.metadata.lastSignInTime,
      roles: roles,
      name: name,
    };
    return this.userService.addUser(data);
  }

  // Return an Observable of the current JWT-token of current user
  getToken(): Observable<string> {
    return this.afAuth.idToken;
  }

  // Return an Observable of if current user is Admin
  isAdminObs(): Observable<boolean> {
    return this.user$.pipe(map(user => {
      if (!user) { return false; }
      return user.roles.admin;
    }));
  }

}



