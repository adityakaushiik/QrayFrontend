import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading = this.loadingSubject.asObservable();

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  showLoading() {
    this.loadingSubject.next(true);
  }

  hideLoading() {
    this.loadingSubject.next(false);
  }

  successSnackBar(message?: string, duration?: number) {
    if (!message) message = 'Success';
    this.snackBar.open('✓ ' + message, '', {
      // panelClass: ['mat-toolbar', 'mat-accent'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration ? duration : 2000,
    });
  }

  errorSnackBar(message?: string, duration?: number) {
    if (!message) message = 'Error';
    this.snackBar.open('✖ ' + message, '', {
      panelClass: ['mat-toolbar', 'mat-warn'],
      // horizontalPosition: 'right',
      // verticalPosition: 'bottom',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration ? duration : 3000,
    });
  }

  warningSnackBar(message?: string, duration?: number) {
    if (!message) message = 'Warning';
    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: duration ? duration : 3000,
    });
  }

  confirmDialog(message: string, callback: () => void) {
    this.dialog.open(ConfirmDialogComponent, {
      data: message,
      autoFocus: false,
    }).afterClosed().subscribe(result => {
      if (result) callback();
    });
  }
}
