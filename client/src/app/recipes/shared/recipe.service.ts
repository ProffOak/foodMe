import { Injectable } from '@angular/core';
import {ObjectService} from '../../core/database/object.service';
import {Recipe} from './recipe.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RecipeService extends ObjectService<Recipe> {

  constructor(private http: HttpClient) {
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

}
