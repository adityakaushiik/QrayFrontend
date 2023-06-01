import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../../services/utils.service";
import {AccountService} from "../../../services/account.service";
import {BasicDetails} from "../../../models/BasicDetails";
import {DocumentInfo} from "../../../models/DocumentInfo";
import {MatDialog} from "@angular/material/dialog";
import {AddDocumentComponent} from "./add-document/add-document.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  basicDetails: BasicDetails = new BasicDetails('', '', '', '', '', '');
  documents: DocumentInfo[] = [];

  editBasicDetails = true;

  constructor(private accountService: AccountService,
              private utilsService: UtilsService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tabChange(0);
  }

  tabChange(n: number) {
    switch (n) {
      case 0:
        this.getBasicDetails();
        break;
      case 1:
        this.getDocuments();
        break;
      case 2:
        this.getBankDetails();
        break;
    }
  }

  getBasicDetails() {
    this.accountService.getUserBasicDetails().subscribe(
      res => {
        this.basicDetails = res;
        console.log(this.basicDetails);
      }, error => {
        console.log(error);
      });
  }

  getDocuments() {
    this.accountService.getDocumentsListing().subscribe(
      res => {
        this.documents = [...res];
        console.log(this.documents);
      }, error => {
        console.log(error);
      });
  }

  getBankDetails() {
    console.log('getBankDetails');
  }

  addDocument() {
    this.dialog.open(AddDocumentComponent, {}).afterClosed().subscribe(
      res => {
        if (res) {
          this.getDocuments();
        }
      });
  }

  viewDocument(document: DocumentInfo) {
    this.accountService.downloadDocument(document.documentReference).subscribe(res => {
      window.open(res, '_blank');
    }, error => {
      console.log(error);
    });
  }

  saveBasicDetails() {
    console.log('saveBasicDetails');
    this.editBasicDetails = true;
  }
}
