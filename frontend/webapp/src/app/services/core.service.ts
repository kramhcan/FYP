import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../components/snack/snack.component';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Ok', messageType: string ) {
    this.snackBar.openFromComponent(SnackComponent, {
      data:{
        message: message,
        buttonText: action,
        type: messageType
      }, 
      duration: 60000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'snack-bar'
    });
    console.log('snack bar opened: ' + message)
  }
}