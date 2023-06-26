import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {UtilsService} from "../../../utils/utils.service";
import {AttendanceInfo} from "../../../models/AttendanceInfo";
import {AttendersInfo} from "../../../models/AttendersInfo";
import {MatDialog} from "@angular/material/dialog";
import {AttendersDetailsComponent} from "./attenders-details/attenders-details.component";
import {QrScannerComponent} from "./qr-scanner/qr-scanner.component";
import {EnterAttendanceNameComponent} from "./enter-attendance-name/enter-attendance-name.component";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  attendanceListing: AttendanceInfo[] = [];
  attenders: AttendersInfo[] = [];

  // loadingComplete: boolean = false;


  constructor(private accountService: AccountService,
              private utilsService: UtilsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.utilsService.showLoading();
    this.getAttendanceListing();
  }

  getAttendanceListing() {
    this.accountService.getAttendanceListing(null).subscribe((res: any) => {
      this.attendanceListing = [...res];
      console.log(this.attendanceListing);
      this.utilsService.hideLoading();
    }, (err) => {
      console.log(err);
      this.utilsService.hideLoading();
    });
  }

  showAttenders(attendance: AttendanceInfo) {
    this.dialog.open(AttendersDetailsComponent, {
      data: attendance,
      width: '98vw',
      maxWidth: '98vw',
      height: '80vh',
    });
  }

  createNewAttendance() {
    this.dialog.open(EnterAttendanceNameComponent, {
      // width: '20vw',
      // maxWidth: '98vw',
      // height: '15vh',

    }).afterClosed().subscribe((res: string) => {
      if (res) {
        this.accountService.createAttendance(res).subscribe((res: any) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        }, () => {
          this.getAttendanceListing();
          this.utilsService.successSnackBar('Attendance created successfully');
        });
      } else {
        this.utilsService.warningSnackBar('No name entered');
      }
    });
  }

  deleteAttendance(attendance: AttendanceInfo) {
    this.accountService.deleteAttendance(attendance.id).subscribe((res: any) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    }, () => {
      this.getAttendanceListing();
      this.utilsService.successSnackBar('Attendance deleted successfully');
    });
  }

  openScannerDialog() {
    this.dialog.open(QrScannerComponent, {
      // width: '90vw',
      maxWidth: '90vw',
    });
  }
}
