import { Injectable } from '@angular/core';
import { ObjectService } from '../../core/database/object.service';
import {HttpClient} from '@angular/common/http';
import {Cuisine} from './cuisine.model';
import {Observable} from 'rxjs';
import {FirestoreService} from '../../core/database/firestore.service';


@Injectable()
export class CuisineService extends ObjectService<Cuisine> {

  constructor(private http: HttpClient, private firestorService: FirestoreService<Cuisine>) {
    super(http, 'cuisines', firestorService);
  }

  //  the array with selected cuisines
  cuisineArray: Cuisine[] = [];


  // get all cuisines from the database
  getCuisines(): Observable<Cuisine[]> {
    return this.getObjects();
  }

  getCuisinesFromIds(cuisineIds: string[]): Observable<Cuisine[]> {
    return this.getAll(cuisineIds);
  }

  createCuisine(cuisine: Cuisine): Promise<any> {
    return this.addObject(cuisine);
  }

  deleteCuisine(id: string): Promise<any> {
    return this.deleteObject(id);
  }


  // checks if the cuisine is in the cuisineArray or not. Pushes if it is not and removes if it is.
  isSelected(cuisine) {
    if (this.includes(this.cuisineArray, cuisine) == false) {
      this.cuisineArray.push(cuisine);
    } else {
      this.cuisineArray.splice(this.indexOf(this.cuisineArray, cuisine), 1);
    }
  }

  // checks if the a cuisine is in a cuisine array by comparing ids
  includes(qArray: Cuisine[], q2: Cuisine) {
    for (const q1 of qArray) {
      if (q1._id == q2._id) {
        return true;
      }
    }
    return false;
  }

  // returns the index of the cuisine in the array
  indexOf(qArray: Cuisine[], q2: Cuisine) {
    for (let i = 0; i < qArray.length; i++) {
      if (qArray[i]._id == q2._id) {
        return i;
      }
    }
    return null;
  }

  // returns an array of cuisine ID strings
  getCuisineIdArray() {
    const idArray: string[] = [];
    for (const q of this.cuisineArray) {
      idArray.push(q._id);
    }
    return idArray;
  }

}
