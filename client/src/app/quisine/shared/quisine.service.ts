import { Injectable } from '@angular/core';
import { ObjectService } from '../../core/database/object.service';
import {HttpClient} from '@angular/common/http';
import {Quisine} from './quisine.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators/';


@Injectable()
export class QuisineService extends ObjectService<Quisine> {

  constructor(private http: HttpClient) {
    super(http, 'quisines');
  }

  quisineArray: Quisine[] = [];


  updateQuisines(quisines: Quisine[]) {
    this.quisineArray = quisines;
  }

  getQuisines(): Observable<Quisine[]> {
    return this.getObjects();
  }


    getQuisineByQid(id: string): Observable<Quisine> {
      return this.getObjectsByQuery({_id: id}).pipe(
        map(quisines => quisines[0])
      );
    }

//ÄNDRA OVAN TILL getObjectById istället

  isSelected(quisine){
    if (this.includes(this.quisineArray, quisine) == false) {
      this.quisineArray.push(quisine);
    } else {
      this.quisineArray.splice(this.indexOf(this.quisineArray, quisine), 1);
    }
  }

  includes(qArray: Quisine[], q2: Quisine){
    for (let q1 of qArray){
      if (q1._id==q2._id){
        return true;
      }
    }
    return false;
  }

  indexOf(qArray: Quisine[], q2: Quisine) {
    for (let i=0; i<qArray.length; i++){
      if (qArray[i]._id==q2._id){
        return i;
      }
    }
    return null;
  }

}
