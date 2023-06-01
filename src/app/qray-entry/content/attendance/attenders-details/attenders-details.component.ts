import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AttendersInfo} from "../../../../models/AttendersInfo";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {TDocumentDefinitions} from "pdfmake/interfaces";
import {QrCodeComponent} from "../qr-code/qr-code.component";


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-attenders-details',
  templateUrl: './attenders-details.component.html',
  styleUrls: ['./attenders-details.component.scss']
})
export class AttendersDetailsComponent {
  displayedColumns: string[] = ['id', 'name', 'date', 'email', 'actions'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AttendersInfo[],
              // @Inject(MAT_DIALOG_DATA) public attendanceId: string,
              private dialog: MatDialog) {
    console.log(this.data);
  }

  generatePDF() {
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
    this.dialog.open(QrCodeComponent, {
      data: text,
    });
  }

  deleteAttendanceRecord(attendanceId: string, recordId: string) {

  }

}
