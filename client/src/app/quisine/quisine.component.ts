import { Component, OnInit } from '@angular/core';
import {log} from "util";
import {Quisine} from "./quisine.model";
import {Observable} from 'rxjs/Observable';
import {QuisineService} from "./quisine.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-quisine',
  templateUrl: './quisine.component.html',
  styleUrls: ['./quisine.component.scss']
})
export class QuisineComponent implements OnInit {

  constructor(private quisineService : QuisineService, private router : Router) {}

quisines: Quisine[] = [];
selectedQuisines: Quisine[];

  ngOnInit() {
  this.quisineService.getQuisines().subscribe(quisines => {
    this.quisines=quisines;
  });
  this.selectedQuisines = this.quisineService.quisineArray;
  console.log(this.selectedQuisines);
  }

  clickQuisine(quisine) {
    this.quisineService.isSelected(quisine);
  }

  clickColor(quisine) {
    return this.quisineService.includes(this.quisineService.quisineArray, quisine) != true;
  }

  nextRoute() {
      this.router.navigate(['/recipes']);
  }



}

