import {Component, Input} from '@angular/core';
import {DocumentInfo} from "../../models/DocumentInfo";

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent {
  @Input() document: DocumentInfo | undefined;

  // constructor() {
  // }

  viewDocument(documentUrl: string | undefined) {
    window.open(documentUrl, '_blank');
  }
}
