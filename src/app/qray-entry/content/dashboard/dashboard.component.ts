import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../../utils/utils.service";
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
    token: '',
  }
  qrDetails: QrLinkGet = this.dummyData;

  constructor(private accountService: AccountService,
              private utilsService: UtilsService,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet) {
  }

  get isMobile(): boolean {
    return this.utilsService.isMobile;
  }

  ngOnInit(): void {
    this.accountService.getQrLinksListing().subscribe((data: any) => {
      this.qrData = data;
      console.log(this.qrData);
    }, error => {
      if (error.status == 401) {
        this.utilsService.errorSnackBar("Unauthorized , Please login again.");
        this.accountService.logout();
      }
    });
  }


  // showQrLinkDetails(qrLink: QrLinkGet) {
  //   if (this.utilsService.isMobile)
  //     this.dialog.open()
  // }

  getLastSeen(lastSeen: string): string {
    if (lastSeen == null) {
      return "Never seen";
    }
    let date = new Date(lastSeen);
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    return "Last seen " + Math.floor(diff / (1000 * 60 * 60)) + " minutes ago";
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

  shareQrLink(qrData: QrLinkGet) {
    window.open(this.accountService.accessUrl + qrData.token, '_blank');
  }
}
