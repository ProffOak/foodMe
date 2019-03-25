import { Component, OnInit } from '@angular/core';
import {Cuisine} from '../shared/cuisine.model';
import {CuisineService} from '../shared/cuisine.service';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-cuisine-form',
  templateUrl: './create-cuisine-form.component.html',
  styleUrls: ['./create-cuisine-form.component.scss']
})
export class CreateCuisineFormComponent implements OnInit {

  cuisine = <Cuisine> {};

  constructor(private cuisineService: CuisineService, private snackBareService: SnackbarService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.cuisineService.createCuisine(this.cuisine).then(() => {
      this.snackBareService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Create);
      this.router.navigate(['/admin']);

    });

  }

}
