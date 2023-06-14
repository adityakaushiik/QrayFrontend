import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {UtilsService} from "../../utils/utils.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoading: boolean = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private accountService: AccountService,
              private utilsService: UtilsService,) {
  }

  ngOnInit() {
    this.utilsService.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  logout() {
    this.accountService.logout();
  }
}
