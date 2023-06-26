import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-enter-attendance-name',
  templateUrl: './enter-attendance-name.component.html',
  styleUrls: ['./enter-attendance-name.component.scss']
})
export class EnterAttendanceNameComponent {
  constructor(private dialogRef: MatDialogRef<EnterAttendanceNameComponent>) {
  }

  closeDialog(string: string) {
    this.dialogRef.close(string);
  }
}
