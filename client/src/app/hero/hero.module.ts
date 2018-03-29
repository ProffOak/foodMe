import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { HeroService } from './shared/hero.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [HeroComponent],
  providers: [HeroService],
  exports: [HeroComponent]
})
export class HeroModule { }
