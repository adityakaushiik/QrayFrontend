import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilsService} from "../../../utils/utils.service";
import {AccountService} from "../../../services/account.service";
import {BasicDetails} from "../../../models/BasicDetails";
import {DocumentInfo} from "../../../models/DocumentInfo";
import {MatDialog} from "@angular/material/dialog";
import {AddDocumentComponent} from "./add-document/add-document.component";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  basicDetails: BasicDetails = new BasicDetails('', '', '', '', '', '');
  documents: DocumentInfo[] = [];
  form: FormGroup;
  bool: boolean = false;
  subscription: Subscription = new Subscription();
  editBasicDetails: Subject<boolean> = new Subject<boolean>();

  constructor(private accountService: AccountService,
              private dialog: MatDialog,
              private utilsService: UtilsService,
              private router: Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.tabChange(0);
    this.subscription = this.editBasicDetails.subscribe(res => {
      if (res) {
        this.form.enable();
        this.bool = true;
      } else {
        this.form.disable();
        this.bool = false;
      }
      this.form.controls['email'].disable();
    });
    this.editBasicDetails.next(false);
    this.getDocuments();
    this.getBasicDetails();
  }

  tabChange(n: number) {
    switch (n) {
      case 0:
        break;
      case 1:
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
        this.form.patchValue(res);
      }, error => {
        console.log(error);
      },
      () => {
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
    if (!this.form.valueChanges)
      console.log('No changes');

    this.accountService.updateUserBasicDetails(this.form.value).subscribe(res => {
        this.editBasicDetails.next(false);
      }, error => {
        console.log(error);
      },
      () => {
        this.utilsService.successSnackBar('Basic details updated successfully')
        this.getBasicDetails();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.editBasicDetails.unsubscribe();
  }

  deleteDocument(document: DocumentInfo) {
    this.utilsService.confirmDialog('Are you sure you want to delete this document?', () => {
      this.accountService.deleteDocument(document.documentId, document.documentReference).subscribe(res => {
        this.getDocuments();
      }, error => {
        console.log(error);
      });
    });
  }
}
