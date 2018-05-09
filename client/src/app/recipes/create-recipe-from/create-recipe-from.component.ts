import { Component, OnInit } from '@angular/core';
import {Recipe} from '../shared/recipe.model';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {RecipeService} from '../shared/recipe.service';
import {FileService} from '../../core/file-upload/file.service';


@Component({
  selector: 'app-create-recipe-from',
  templateUrl: './create-recipe-from.component.html',
  styleUrls: ['./create-recipe-from.component.scss']
})
export class CreateRecipeFromComponent implements OnInit {

  recipe = <Recipe>{ingredients: [], quisines: []};

  imageFile: File;

  separatorKeysCodes = [ENTER, COMMA];
  removable = true;

  constructor(private recipeService: RecipeService, private fileService: FileService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
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
    const uploadTask = this.fileService.uploadFile(this.imageFile);
    uploadTask.downloadURL().take(1).subscribe(url => {
      this.recipe.imgUrl = url;
      this.recipeService.addRecipe(this.recipe).toPromise().then(res => console.log(res));
    });
  }

}
