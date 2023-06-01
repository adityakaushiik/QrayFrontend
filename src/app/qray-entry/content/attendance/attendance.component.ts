import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {UtilsService} from "../../../services/utils.service";
import {AttendanceInfo} from "../../../models/AttendanceInfo";
import {AttendersInfo} from "../../../models/AttendersInfo";
import {MatDialog} from "@angular/material/dialog";
import {AttendersDetailsComponent} from "./attenders-details/attenders-details.component";

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
    if (attendance.totalAttenders === 0) {
      this.utilsService.warningSnackBar('No attenders found');
      return;
    }
    this.utilsService.showLoading();
    this.accountService.getAttendanceListing(attendance.id).subscribe((res: any) => {
      this.attenders = [...res];
      this.dialog.open(AttendersDetailsComponent, {
        data: this.attenders,
        width: '80%',
        height: '80%'
      });
      this.utilsService.hideLoading();
    }, (err) => {
      console.log(err);
      this.utilsService.hideLoading();
    });
  }

  createNewAttendance() {
    this.accountService.createAttendance().subscribe((res: any) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    }, () => {
      this.getAttendanceListing();
      this.utilsService.successSnackBar('Attendance created successfully');
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

}
