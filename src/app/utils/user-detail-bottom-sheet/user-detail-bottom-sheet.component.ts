import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {AccountService} from "../../services/account.service";
import {BasicDetails} from "../../models/BasicDetails";

@Component({
  selector: 'app-user-detail-bottom-sheet',
  templateUrl: './user-detail-bottom-sheet.component.html',
  styleUrls: ['./user-detail-bottom-sheet.component.scss']
})
export class UserDetailBottomSheetComponent implements OnInit {
  form: any = {};
  user: BasicDetails = new BasicDetails('', '', '', '', '', '');

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public uid: string,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getUserBasicDetails(this.uid).subscribe((res: any) => {
      this.user = res;
    });
  }
}
