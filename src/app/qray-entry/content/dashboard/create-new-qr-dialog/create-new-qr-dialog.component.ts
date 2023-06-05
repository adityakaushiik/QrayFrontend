import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {UtilsService} from "../../../../services/utils.service";
import {AccountService} from "../../../../services/account.service";
import {DocumentInfo} from "../../../../models/DocumentInfo";

@Component({
  selector: 'app-create-new-qr-dialog',
  templateUrl: './create-new-qr-dialog.component.html',
  styleUrls: ['./create-new-qr-dialog.component.scss']
})
export class CreateNewQrDialogComponent implements OnInit {
  documentsInfo: DocumentInfo[] = [];
  public documents: string[] = [];

  constructor(private utilsService: UtilsService,
              private accountService: AccountService,
              private bottomSheetRef: MatBottomSheetRef<CreateNewQrDialogComponent>) {

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
      this.bottomSheetRef.dismiss();
    });
  }
}
