import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AttendersInfo} from "../../../../models/AttendersInfo";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {TDocumentDefinitions} from "pdfmake/interfaces";
import {AttendanceInfo} from "../../../../models/AttendanceInfo";
import {UtilsService} from "../../../../services/utils.service";
import {AccountService} from "../../../../services/account.service";


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-attenders-details',
  templateUrl: './attenders-details.component.html',
  styleUrls: ['./attenders-details.component.scss']
})
export class AttendersDetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'email', 'actions'];
  data: AttendersInfo[] = [];
  showQr = false;

  constructor(@Inject(MAT_DIALOG_DATA) public attendance: AttendanceInfo,
              private dialog: MatDialog,
              private utilsService: UtilsService,
              private accountService: AccountService) {
  }

  generatePDF() {
    if (this.attendance.totalAttenders === 0) {
      this.utilsService.warningSnackBar('No attenders found');
      return;
    }
    const documentDefinition: TDocumentDefinitions = {
      content: [
        {text: 'Attendance Details', style: 'header'},
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              ['S.No', 'Added DateTime', 'Display Name', 'Email'],
              ...this.data.map((model, index) =>
                [index + 1, model.addedDateTime, model.displayName, model.email])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('attendance_details.pdf');
  }

  createQRCode(text: string) {
    // this.dialog.open(QrCodeComponent, {
    //   data: text,
    // });
    this.showQr = !this.showQr;
  }

  deleteAttendanceRecord(recordId: string) {
    this.accountService.removeAttendance(this.attendance.id, recordId).subscribe((res: any) => {
        console.log(res);
        this.utilsService.successSnackBar('Record deleted successfully');
      }, (err) => {
        console.log(err);
        this.utilsService.errorSnackBar('Error while deleting record');
      },
      () => {
        this.ngOnInit();
      });
  }

  refresh() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.utilsService.showLoading();
    this.accountService.getAttendanceListing(this.attendance.id).subscribe((res: any) => {
      this.data = [...res];
      this.utilsService.hideLoading();
    }, (err) => {
      console.log(err);
      this.utilsService.hideLoading();
    });
  }
}
