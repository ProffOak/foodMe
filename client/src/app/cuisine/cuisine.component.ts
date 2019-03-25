import { Component, OnInit } from '@angular/core';
import {log} from 'util';
import {Cuisine} from './shared/cuisine.model';
import {Observable} from 'rxjs';
import {CuisineService} from './shared/cuisine.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.scss']
})
export class CuisineComponent implements OnInit {

  constructor(private cuisineService: CuisineService, private router: Router) {}

cuisines: Cuisine[] = [];

  ngOnInit() {
  this.cuisineService.getCuisines().subscribe(cuisines => {
    this.cuisines = cuisines;
  });
  }

  //select cuisine
  clickCuisine(cuisine) {
    this.cuisineService.isSelected(cuisine);
  }

  //change color of buttons for selected cuisines
  clickColor(cuisine) {
    return this.cuisineService.includes(this.cuisineService.cuisineArray, cuisine) != true;
  }

  //go to /recipes when swipe button is pressed
  nextRoute() {
      this.router.navigate(['/recipes']);
  }



}

