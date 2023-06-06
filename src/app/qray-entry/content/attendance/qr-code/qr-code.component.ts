import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as QRCode from "qrcode";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  @Input() public text: string = '';
  @Output() emit: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.generateQRCode(this.text);
  }

  generateQRCode(text: string) {
    if (text === '') {
      return;
    }
    const canvas = document.getElementById('qrcodeCanvas') as HTMLCanvasElement;
    QRCode.toCanvas(canvas, text, {width: 200}, function (error) {
      if (error) {
        console.error('Error generating QR code:', error);
      }
    });
  }

  refresh() {
    this.emit.emit();
  }
}
