import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {User} from './shared/user.model';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';


@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { }

  // Update the user Observable with the user from the database
  private setUserObs() {
    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.user$ = this.userService.getUserByUid(user.uid);
        } else {
          return Observable.of(null);
        }
      });
  }

  ///// Login/Signup //////

  // Google provider
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.setUserObs();
        this.updateUserData(credential.user);
      });
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  // TODO: Implement set User data to DB
  private updateUserData(newUserData) {
    // Sets user data to DB on login
    this.userService.patchObject(newUserData, {uid: newUserData.uid});

  }
}



