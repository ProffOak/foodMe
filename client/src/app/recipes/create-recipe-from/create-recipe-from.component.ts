import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../shared/recipe.model';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {RecipeService} from '../shared/recipe.service';
import {FileService} from '../../core/file-upload/file.service';
import {AuthService} from '../../core/auth/auth.service';
import {User} from '../../core/auth/shared/user.model';
import {Subscription} from 'rxjs/Subscription';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';
import {Router} from '@angular/router';
import {QuisineService} from '../../quisine/quisine.service';
import {Observable} from 'rxjs/Observable';
import {Quisine} from '../../quisine/quisine.model';


@Component({
  selector: 'app-create-recipe-from',
  templateUrl: './create-recipe-from.component.html',
  styleUrls: ['./create-recipe-from.component.scss']
})
export class CreateRecipeFromComponent implements OnInit, OnDestroy {

  recipe = <Recipe>{ingredients: [], quisines: []};

  imageFile: File;

  separatorKeysCodes = [ENTER, COMMA];

  userSub: Subscription;
  currentUser: User;

  quisinesObs: Observable<Quisine[]>;

  selectedQuisines = <Quisine[]>[];

  constructor(private recipeService: RecipeService, private fileService: FileService, private sanitizer: DomSanitizer,
              private authService: AuthService, private snackbarService: SnackbarService, private router: Router,
              private quisineService: QuisineService) { }

  ngOnInit() {
    this.userSub = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
    this.quisinesObs = this.quisineService.getQuisines();
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
    // Add the quisine ids to the recipe
    for (const quisine of this.selectedQuisines) {
      this.recipe.quisines.push(quisine._id);
    }
    this.recipe.uid = this.currentUser.uid;
    const uploadTask = this.fileService.uploadFile(this.imageFile);
    uploadTask.downloadURL().take(1).subscribe(url => {
      this.recipe.imgUrl = url;
      this.recipeService.addRecipe(this.recipe).toPromise().then(res => {
          this.snackbarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Create);
          this.router.navigate(['']);
      });
    });
  }

  // Unsubscribe from user observable
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


}
