import { Component, OnInit } from '@angular/core';
import {log} from "util";
import {Quisine} from "./quisine.model";
import {Observable} from 'rxjs/Observable';
import {QuisineService} from "./quisine.service";

@Component({
  selector: 'app-quisine',
  templateUrl: './quisine.component.html',
  styleUrls: ['./quisine.component.scss']
})
export class QuisineComponent implements OnInit {

  constructor(private quisineService : QuisineService) {}

quisines: Quisine[] = [];
selectedQuisines: Quisine[] = [];

  ngOnInit() {
  this.quisineService.getQuisines().subscribe(quisines => {
    this.quisines=quisines;
  })
  }

    isSelected(quisine){
      if (this.selectedQuisines.includes(quisine) == false) {
        this.selectedQuisines.push(quisine);
      } else {
        this.selectedQuisines.splice(this.selectedQuisines.indexOf(quisine), 1)
      }
  }

  clickColor(quisine) {
    return this.selectedQuisines.includes(quisine) != true;
  }



}

