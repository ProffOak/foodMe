import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import {MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';

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

    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  declarations: [NavComponent],
  exports: [NavComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class CoreModule { }
