import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {QuisineService} from "../quisine.service";

@Component({
  selector: 'app-quisine',
  templateUrl: './quisine.component.html',
  styleUrls: ['./quisine.component.scss']
})
export class QuisineComponent implements OnInit {

  lars = 'god mat';
  checked = false;
  clickMessage = 'inte klickad';

  quisines: any = [
    { id: 1, name:'Skandinaviskt', checked: false },
    { id: 2, name:'Amerikanskt', checked: false  },
    { id: 3, name:'Franskt', checked: false  }
  ];




  selectedQuisines: any = [];
/*
    quisines: Array<any>;
    constructor(private _quisineService: QuisineService) {


      this._quisineService.getQuisines()
        .subscribe(res => this.quisines = res);

    }
*/
  ngOnInit() {
  }

  addQuisine() {
    this.selectedQuisines.push()
  }
  getSelected(i) {
    this.selectedQuisines.push(this.quisines[i]);

    }

  onClick(event) {
    console.log(event);
    console.log(event.target);
  }


}

