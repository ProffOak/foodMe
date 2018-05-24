import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import {MatBadgeModule, MatButtonModule, MatIconModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {AuthService} from './auth/auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {UserService} from './auth/user.service';
import {FileService} from './file-upload/file.service';
import {SnackbarService} from './snackbar/snackbar.service';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pinch': { enable: false },
    'rotate': { enable: false }
  };
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Firebase imports
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,

    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatBadgeModule,
    FlexLayoutModule
  ],
  declarations: [NavComponent],
  exports: [NavComponent],
  providers: [
    SnackbarService,
    FileService,
    AuthService,
    UserService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class CoreModule { }
