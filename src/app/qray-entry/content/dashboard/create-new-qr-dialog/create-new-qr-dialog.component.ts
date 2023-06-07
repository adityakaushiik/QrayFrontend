import {Component, OnInit, ViewChild} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {UtilsService} from "../../../../services/utils.service";
import {AccountService} from "../../../../services/account.service";
import {DocumentInfo} from "../../../../models/DocumentInfo";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-create-new-qr-dialog',
  templateUrl: './create-new-qr-dialog.component.html',
  styleUrls: ['./create-new-qr-dialog.component.scss']
})
export class CreateNewQrDialogComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  documentsInfo: DocumentInfo[] = [];
  public documents: string[] = [];
  backendResponseReceived = false;
  copyLink: string = "";
  copied: string = 'Copy';

  constructor(private utilsService: UtilsService,
              private accountService: AccountService,
              public bottomSheetRef: MatBottomSheetRef<CreateNewQrDialogComponent>) {

  }

  copyToClipboard(bool: boolean) {
    this.copied = bool ? 'Copied' : 'Copy';
  }

  toggleDocument(document: string | undefined): void {
    if (document === undefined) return;
    if (this.documents.includes(document)) {
      // Remove document from the array if it already exists
      this.documents = this.documents.filter(doc => doc !== document);
    } else {
      // Add document to the array if it doesn't exist
      this.documents.push(document);
    }
  }

  ngOnInit(): void {
    this.accountService.getDocumentsListing().subscribe((data: any) => {
      this.documentsInfo = data;
    });
  }

  createQrLink(type: string, sessionName: string, valid: string, documentIds: string[]) {
    console.log(type, sessionName, valid, documentIds);
    this.accountService.createQrLink(type, sessionName, parseInt(valid), documentIds).subscribe((data: any) => {
        this.utilsService.successSnackBar("Qr link created successfully");
        this.copyLink = 'http://qray.s3-website.ap-south-1.amazonaws.com/access/' + data.token;
      },
      (error: any) => {
        this.utilsService.errorSnackBar(error.error);
      },
      () => {
        this.stepper.selectedIndex = 3;
        this.backendResponseReceived = true;
      });
  }
}
