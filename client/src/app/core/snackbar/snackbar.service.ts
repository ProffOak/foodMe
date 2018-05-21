import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {SnackbarMessage, SnackbarStyle} from './SnackbarConstants';



@Injectable()
export class SnackbarService {

  snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
  message: string;
  // Duration in ms
  defaultDuration = 2000;

  constructor(private snackBar: MatSnackBar) {
    this.snackBarConfig.duration = this.defaultDuration;
  }

  showSnackBar(snackbarStyle: SnackbarStyle, snackbarMessage: SnackbarMessage, message?: string) {
    // Set the message of Snackbar
    if (snackbarMessage === SnackbarMessage.Custom) {
        this.message = message;
    } else {
      this.message = snackbarMessage;
    }
    // Style the snackbar, css in Style.css in root
    this.snackBarConfig.panelClass = [snackbarStyle];
    return this.snackBar.open(this.message, '', this.snackBarConfig);
  }




}
