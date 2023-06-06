import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../../services/utils.service";
import {AccountService} from "../../../services/account.service";
import {QrLinkGet} from "../../../models/QrLinkGet";
import {MatDialog} from "@angular/material/dialog";
import {CreateNewQrDialogComponent} from "./create-new-qr-dialog/create-new-qr-dialog.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  qrData: QrLinkGet[] = [];
  dummyData: QrLinkGet = {
    creationDate: '',
    deviceList: [],
    documentIds: [],
    documents: [],
    id: null,
    lastSeen: '',
    sessionName: '',
    sessionType: '',
    sessionValidTime: '',
  }
  qrDetails: QrLinkGet = this.dummyData;

  constructor(private accountService: AccountService,
              private utilsService: UtilsService,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.accountService.getQrLinksListing().subscribe((data: any) => {
      this.qrData = data;
      console.log(this.qrData);
    });
  }

  getLastSeen(lastSeen: string): string {
    if (lastSeen == null) {
      return "Never seen";
    }
    let date = new Date(lastSeen);
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    return "Last seen " + Math.floor(diff / (1000 * 60 * 60)) + " minutes ago";
  }


  showQrLinkDetails(qrLink: QrLinkGet) {

  }

  viewDocument(documentRef: string) {
    this.accountService.downloadDocument(documentRef).subscribe(res => {
      window.open(res, '_blank');
    }, error => {
      console.log(error);
    });
  }

  deleteQrLink(qrId: string | null) {
    if (qrId == null)
      return;
    this.accountService.deleteQrLink(qrId).subscribe((data: any) => {
        console.log(data);
      }, error => {
        this.utilsService.errorSnackBar("Error deleting qr link");
      },
      () => {
        this.utilsService.successSnackBar("Qr link deleted successfully");
        this.ngOnInit();
      });
  }

  openCreateDialog() {
    // this.dialog.open(CreateNewQrDialogComponent, {
    //   width: '500px',
    //   height: '500px',
    // });

    this.bottomSheet.open(CreateNewQrDialogComponent, {
      panelClass: 'bottom-sheet',
    }).afterDismissed().subscribe((data: any) => {
      this.ngOnInit();
    });
  }


}
