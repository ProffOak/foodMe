import { Injectable } from '@angular/core';
import {ObjectService} from '../../core/database/object.service';
import {Recipe} from './recipe.model';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Cuisine} from "../../cuisine/shared/cuisine.model";
import {FileService} from '../../core/file-upload/file.service';
import {subscribeToPromise} from 'rxjs/internal/util/subscribeToPromise';
import {merge} from 'rxjs/operators';
import {concat, switchMap, toArray} from 'rxjs/internal/operators';

@Injectable()
export class RecipeService extends ObjectService<Recipe> {

  constructor(private http: HttpClient, private fileService: FileService) {
    super(http, 'recipes');
  }

  getRecipes(): Observable<Recipe[]> {
    return this.getObjects();
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.getObjectById(id);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.addObject(recipe);
  }

  getRandomRecipes(limit: number): Observable<Recipe[]> {
    return this.getObjectsByQuery({limit: limit, random: true});
  }

  getRandomCuisineRecipes(limit: number, cuisines: string[]): Observable<Recipe[]> {

    return this.getObjectsByQuery({limit: limit, random: true, cuisines: cuisines})
  }

  removeRecipe(recipe: Recipe): Observable<any> {
    return of(this.fileService.deleteFromUrl(<string>recipe.imgUrl)).pipe(switchMap(res => {
      return this.deleteObject(recipe);
    }));
  }

}
