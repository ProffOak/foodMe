import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../shared/recipe.model';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {RecipeService} from '../shared/recipe.service';
import {FileService} from '../../core/file-upload/file.service';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Subscription, Observable} from 'rxjs';
import { take } from 'rxjs/operators';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';
import {Router} from '@angular/router';
import {CuisineService} from '../../cuisine/shared/cuisine.service';
import {Cuisine} from '../../cuisine/shared/cuisine.model';
import {tap} from 'rxjs/operators';
import {takeLast} from 'rxjs/internal/operators';


@Component({
  selector: 'app-create-recipe-from',
  templateUrl: './create-recipe-from.component.html',
  styleUrls: ['./create-recipe-from.component.scss']
})
export class CreateRecipeFromComponent implements OnInit, OnDestroy {

  recipe = <Recipe>{ingredients: [], cuisines: []};

  imageFile: File;

  separatorKeysCodes = [ENTER, COMMA];

  userSub: Subscription;
  fileSub: Subscription;
  currentUser: User;

  cuisinesObs: Observable<Cuisine[]>;

  selectedCuisines = <Cuisine[]>[];

  constructor(private recipeService: RecipeService, private fileService: FileService, private sanitizer: DomSanitizer,
              private authService: AuthService, private snackbarService: SnackbarService, private router: Router,
              private cuisineService: CuisineService) { }

  ngOnInit() {
    this.userSub = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
    this.cuisinesObs = this.cuisineService.getCuisines();
  }
  addIngredient(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.recipe.ingredients.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeIngredient(ingredient: any): void {
    const index = this.recipe.ingredients.indexOf(ingredient);
    if (index >= 0) {
      this.recipe.ingredients.splice(index, 1);
    }
  }

  fileSelected(files: FileList) {
    this.imageFile = files[0];
    this.recipe.imgUrl = <string>this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.imageFile));
  }

  onSubmit() {
    // Add the cuisine ids to the recipe
    for (const cuisine of this.selectedCuisines) {
      this.recipe.cuisines.push(cuisine._id);
    }
    this.recipe.uid = this.currentUser.uid;
    // Subscribe to the snapshot from firebase but only take use it when completed using takeLast
    this.fileSub = this.fileService.uploadFile(this.imageFile).snapshotChanges().pipe(takeLast(1)).subscribe(snap => {
      snap.ref.getDownloadURL().then(url => {
        this.recipe.imgUrl = url;
        // Add recipe to the database
        this.recipeService.addRecipe(this.recipe).pipe(take(1)).subscribe(res => {
          // Show Success Message when complete and navigate to main page
          this.snackbarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Create);
          this.router.navigate(['']);        });
      });
    });
  }

// Unsubscribe from user observable
  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.fileSub) {
      this.fileSub.unsubscribe();
    }
  }


}
