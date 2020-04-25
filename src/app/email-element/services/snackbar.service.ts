import { Injectable, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { MESSAGE_CONFIG_TOKEN } from './message.config';

@Injectable()
export class SnackbarService {

  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  openTextOnlySnackBar(message: string) {
    return this.matSnackBar.open(message);
  }

  // openActionSnackBar(message: string, action: string) {}

  openCustomConfigSnackBar( message: string, action: string, snackBarConfig?: MatSnackBarConfig ) {
    let config: MatSnackBarConfig = {
      duration: 2000
    };

    if (snackBarConfig) {
      Object.assign(config, snackBarConfig);
    }
    
    return this.matSnackBar.open( message, action, config );
  }
}
