import { Component, OnInit } from '@angular/core';
import {log} from "util";
import {Quisine} from "./quisine.model";
import {Observable} from 'rxjs';
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

    isSelected(quisine){
      if (this.includes(this.selectedQuisines, quisine) == false) {
        this.selectedQuisines.push(quisine);
        this.quisineService.updateQuisines(this.selectedQuisines);
        console.log(this.quisineService.quisineArray);
      } else {
        this.quisineService.quisineArray.splice(this.selectedQuisines.indexOf(quisine), 1);
        this.quisineService.updateQuisines(this.selectedQuisines);
        console.log(this.quisineService.quisineArray);
      }
  }

  clickColor(quisine) {
    return this.includes(this.quisineService.quisineArray, quisine) != true;
  }

  nextRoute() {
      this.router.navigate(['/recipes']);
  }

  includes(qArray: Quisine[], q2: Quisine){
    for (let q1 of qArray){
      if (q1._id==q2._id){
        return true;
      }
    }
    return false;
  }

}

