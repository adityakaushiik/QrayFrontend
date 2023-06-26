import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Result} from "@zxing/library";
import {BrowserQRCodeReader} from "@zxing/browser";
import {UtilsService} from "../../../../utils/utils.service";
import {AccountService} from "../../../../services/account.service";
import {MatDialogRef} from "@angular/material/dialog";


export interface MarkAttendance {
  attendanceId: string,
  attendersId: string,
  displayName: string,
  email: string,
}

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements AfterViewInit {
  scannedQrCode: string | null = null;
  @ViewChild('video', {static: true}) videoElementRef!: ElementRef;
  codeReader!: BrowserQRCodeReader;
  videoElement!: HTMLVideoElement;
  loading: boolean = false;

  constructor(private accountService: AccountService,
              private utilsService: UtilsService,
              private dialogRef: MatDialogRef<QrScannerComponent>) {
    this.loading = true;
  }

  ngAfterViewInit() {
    this.codeReader = new BrowserQRCodeReader();
    this.videoElement = this.videoElementRef.nativeElement;
    this.loading = false;
    this.startScanner();
  }

  startScanner() {
    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
      this.videoElement.srcObject = stream;

      this.codeReader.decodeOnceFromVideoElement(this.videoElement).then((result: Result) => {
        console.log('QR code scanned:', result.getText());
        // Do something with the scanned QR code content
        this.handleScan(result.getText());
      }).catch((error: any) => {
        console.error('Error scanning QR code:', error);
      });
    }).catch((error: any) => {
      console.error('Error accessing camera stream:', error);
    });
  }

  stopScanner() {
    if (this.videoElement.srcObject) {
      const stream = this.videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => {
        track.stop();
      });
      this.videoElement.srcObject = null;
    }
  }

  private handleScan(content: string) {
    this.scannedQrCode = content;
    let parse = JSON.parse(content);
    let uid = parse.uid;
    let attendanceId = parse.attendanceId;

    let markAttendance: MarkAttendance = {
      attendanceId: attendanceId,
      attendersId: this.accountService.userValue.uid,
      displayName: this.accountService.userValue.displayName,
      email: this.accountService.userValue.email,
    };

    this.accountService.markAttendance(uid, markAttendance).subscribe(
      (res: any) => {
        console.log('Attendance marked successfully');
      },
      (err: any) => {
        this.utilsService.errorSnackBar('Error marking attendance');
      },
      () => {
        this.utilsService.successSnackBar('Attendance marked successfully');
        this.stopScanner();
        this.dialogRef.close();
      });
  }
}

// loadingComplete: boolean = false;
// public scannedQrCode: string | null = null;
// private scanner: any;
// private Instascan: any;
//
// constructor(private accountService: AccountService,
//             private utilsService: UtilsService) {
// }
//
// ngOnInit() {
//   const video = document.getElementById('qr-video') as HTMLVideoElement;
//
//   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({video: true})
//       .then((stream: MediaStream) => {
//         video.srcObject = stream;
//         video.play();
//
//         this.scanner = new Instascan.Scanner({video});
//         this.scanner.addListener('scan', this.handleScan.bind(this));
//         this.Instascan.Camera.getCameras().then((cameras: any[]) => {
//           if (cameras.length > 0) {
//             const camera = cameras[0];
//             this.scanner.start(camera);
//           } else {
//             console.error('No cameras found.');
//           }
//         });
//       })
//       .catch((error: any) => {
//         console.error('Error accessing camera:', error);
//       });
//   } else {
//     console.error('getUserMedia is not supported by this browser.');
//   }
// }
//
// ngOnDestroy() {
//   if (this.scanner) {
//     this.scanner.stop();
//   }
// }
//
// ngAfterViewInit(): void {
// }
//
// private handleScan(content: string) {
//   this.scannedQrCode = content;
//   let parse = JSON.parse(content);
//   let uid = parse.uid;
//   let attendanceId = parse.attendanceId;
//
//   let markAttendance: MarkAttendance = {
//     attendanceId: attendanceId,
//     attendersId: this.accountService.userValue.uid,
//     displayName: this.accountService.userValue.displayName,
//     email: this.accountService.userValue.email,
//   }
//   this.accountService.markAttendance(uid, markAttendance).subscribe(
//     (res: any) => {
//
//     },
//     (err: any) => {
//
//     },
//     () => {
//       this.utilsService.successSnackBar('User marked successfully');
//     });
//
//   console.log('Scanned QR code:', content);
// }

