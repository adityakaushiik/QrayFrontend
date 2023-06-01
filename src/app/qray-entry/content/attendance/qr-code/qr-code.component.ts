import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import * as QRCode from "qrcode";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public text: string) {
  }

  ngOnInit(): void {
    this.generateQRCode(this.text);
  }

  generateQRCode(text: string) {
    const canvas = document.getElementById('qrcodeCanvas') as HTMLCanvasElement;
    QRCode.toCanvas(canvas, text, {width: 200}, function (error) {
      if (error) {
        console.error('Error generating QR code:', error);
      }
    });
  }
}
