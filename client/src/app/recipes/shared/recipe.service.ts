import { Injectable } from '@angular/core';
import {ObjectService} from '../../core/database/object.service';
import {Recipe} from './recipe.model';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, of} from 'rxjs';
import {Cuisine} from '../../cuisine/shared/cuisine.model';
import {FileService} from '../../core/file-upload/file.service';
import {subscribeToPromise} from 'rxjs/internal/util/subscribeToPromise';
import { take, combineAll} from 'rxjs/operators';
import {concat, switchMap, toArray, merge, map} from 'rxjs/internal/operators';
import {FirestoreService} from '../../core/database/firestore.service';
import {AuthService} from '../../core/auth/auth.service';

@Injectable()
export class RecipeService extends ObjectService<Recipe> {

  constructor(private http: HttpClient, private fileService: FileService, private firestoreService: FirestoreService<Recipe>,
              private authService: AuthService) {
    super(http, 'recipes', firestoreService);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.getObjects();
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.getObjectById(id);
  }

  getMyRecipes(): Observable<Recipe[]> {
    return this.authService.user$.pipe(switchMap(user => {
      return this.getObjectsByQuery(ref => ref.where('uid', '==', user.uid));
    }));
  }

  addRecipe(recipe: Recipe): Promise<Recipe> {
    return this.addObject(recipe);
  }

  updateRecipe(recipe: Recipe): Promise<any> {
    return this.patchObject(recipe, recipe._id);
  }

  // TODO: MAKE the function actually return random recipies
  getRandomCuisineRecipes(limit: number, cuisines: string[]): Observable<Recipe[]> {
    const recipeObsArr = <Observable<Recipe[]>[]> [];
    for (const cuisine of cuisines) {
      recipeObsArr.push(this.getObjectsByQuery(
        ref => ref.where('cuisineObj.' + cuisine, '==', true).limit(limit)));
    }
    // Combine all the arrays
    return combineLatest(recipeObsArr, (...arrays) => arrays.reduce((acc, array) => [...acc, ...array], [])
    );

  }

  removeRecipe(recipe: Recipe): Observable<any> {
    return of(this.fileService.deleteFromUrl(<string>recipe.imgUrl)).pipe(switchMap(res => {
      return this.deleteObject(recipe);
    }));
  }

}
