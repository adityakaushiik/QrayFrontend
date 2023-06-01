import {Component} from '@angular/core';
import {UtilsService} from "../../../services/utils.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  exampleData = [1, 2, 3, 4, 5];

  constructor(private utilsService: UtilsService) {
  }

  openSnackBar(message: string, action: string) {
    this.utilsService.successSnackBar(message);
  }
}
