import {Component} from '@angular/core';
import {AccountService} from "../../../../services/account.service";
import {MatDialogRef} from "@angular/material/dialog";
import {UtilsService} from "../../../../services/utils.service";

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {
  file: File | undefined;

  selectedFileName: string = '';

  constructor(private accountService: AccountService,
              private dialogRef: MatDialogRef<AddDocumentComponent>,
              private utilsService: UtilsService) {
  }

  fileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      console.log('Selected file:', this.selectedFileName);
      this.file = event.target.files[0];
      // You can perform further processing with the selected file here
    } else {
      this.selectedFileName = '';
    }
  }

  // fileSelect(event: any) {
  //   this.file = event.target.files[0];
  // }

  upload(name: string) {
    if (this.file) {
      this.accountService.uploadDocument(name, this.file).subscribe((res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorSnackBar("Error uploading document");
        },
        () => {
          console.log('Upload complete');
          this.utilsService.successSnackBar("Document uploaded successfully");
          this.dialogRef.close(true);
        });
    } else {
      console.log("No file selected");
    }
  }
}
