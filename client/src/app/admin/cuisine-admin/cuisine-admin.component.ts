import { Component, OnInit } from '@angular/core';
import {CuisineService} from '../../cuisine/shared/cuisine.service';
import {Cuisine} from '../../cuisine/shared/cuisine.model';
import {Observable} from 'rxjs/internal/Observable';
import {SnackbarService} from '../../core/snackbar/snackbar.service';
import {SnackbarMessage, SnackbarStyle} from '../../core/snackbar/SnackbarConstants';

@Component({
  selector: 'app-cuisine-admin',
  templateUrl: './cuisine-admin.component.html',
  styleUrls: ['./cuisine-admin.component.scss']
})
export class CuisineAdminComponent implements OnInit {

  cuisines: Observable<Cuisine[]>;

  constructor(private cuisineService: CuisineService, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.cuisines = this.cuisineService.getCuisines();

  }

  onDeleteClick(cuisine: Cuisine) {
    this.cuisineService.deleteCuisine(cuisine._id).then(() => {
      this.snackbarService.showSnackBar(SnackbarStyle.Success, SnackbarMessage.Delete);
    });

  }
}
