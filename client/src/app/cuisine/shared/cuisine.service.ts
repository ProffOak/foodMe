import { Injectable } from '@angular/core';
import { ObjectService } from '../../core/database/object.service';
import {HttpClient} from '@angular/common/http';
import {Cuisine} from './cuisine.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators/';


@Injectable()
export class CuisineService extends ObjectService<Cuisine> {

  constructor(private http: HttpClient) {
    super(http, 'cuisines');
  }

  //the array with selected cuisines
  cuisineArray: Cuisine[] = [];


  //get all cuisines from the database
  getCuisines(): Observable<Cuisine[]> {
    return this.getObjects();
  }


  //checks if the cuisine is in the cuisineArray or not. Pushes if it is not and removes if it is.
  isSelected(cuisine){
    if (this.includes(this.cuisineArray, cuisine) == false) {
      this.cuisineArray.push(cuisine);
    } else {
      this.cuisineArray.splice(this.indexOf(this.cuisineArray, cuisine), 1);
    }
  }

  //checks if the a cuisine is in a cuisine array by comparing ids
  includes(qArray: Cuisine[], q2: Cuisine){
    for (let q1 of qArray){
      if (q1._id==q2._id){
        return true;
      }
    }
    return false;
  }

  //returns the index of the cuisine in the array
  indexOf(qArray: Cuisine[], q2: Cuisine) {
    for (let i=0; i<qArray.length; i++){
      if (qArray[i]._id==q2._id){
        return i;
      }
    }
    return null;
  }

  //returns an array of cuisine ID strings
  getCuisinedeIdArray() {
    const idArray: string[] = [];
    for (let q of this.cuisineArray) {
      idArray.push(q._id);
    }
    console.log(idArray);
    return idArray;
  }

}
