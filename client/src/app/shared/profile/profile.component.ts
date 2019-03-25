import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {RecipeService} from '../../recipes/shared/recipe.service';
import {Recipe} from '../../recipes/shared/recipe.model';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userObs: Observable<User>;
  recipiesObs: Observable<Recipe[]>;
  constructor(private authService: AuthService, private recipeSerice: RecipeService) { }

  ngOnInit() {
    this.userObs = this.authService.user$;
    this.recipiesObs = this.recipeSerice.getMyRecipes();

  }
}
