import {Component} from '@angular/core';

@Component({
  selector: 'app-qray-entry',
  templateUrl: './qray-entry.component.html',
  styleUrls: ['./qray-entry.component.scss']
})
export class QrayEntryComponent {
  width = screen.width;

  get isMobile(): boolean {
    // console.log(this.width < 800);
    return this.width < 800;
  }

  get mode() {
    return this.width > 800 ? 'side' : 'over';
  }
}
