import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DocumentInfo} from "../models/DocumentInfo";


@Component({
  selector: 'app-access-information',
  templateUrl: './access-information.component.html',
  styleUrls: ['./access-information.component.scss']
})
export class AccessInformationComponent implements OnInit {
  info: any | null = null;
  token: string | null = '';
  allInfoReceived = false;
  documents: DocumentInfo[] = [];

  constructor(private router: Router,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.token = params.get('token');
      console.log(this.token);
      this.retrieveDeviceInformationAndIP();
    }, error => {
      console.log(error);
    });
  }

  getIPAddress() {
    return this.http.get('https://api.ipify.org?format=json');
  }

  retrieveDeviceInformationAndIP() {
    console.log('retrieveDeviceInformationAndIP');
    let deviceInfo = new AccessRequest(
      navigator.userAgent,
      window.screen.width,
      window.screen.height,
      /Mobile/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      '');

    this.getIPAddress().subscribe((response: any) => {
      deviceInfo.ipAddress = response.ip;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
      this.getData(deviceInfo);
    });
  }


  getData(deviceInfo: AccessRequest) {
    console.log(deviceInfo);
    if (this.token == null) {
      console.log('token is null');
      return;
    }
    this.http.post('http://localhost:8080/api/qrLink/access', deviceInfo, {
      params: {
        token: this.token,
      }
    }).subscribe((response: any) => {
        this.documents = response.documents;
        console.log(this.documents)
        delete response.documents;
        this.info = response;
        console.log(response);
        this.allInfoReceived = true;
      },
      error => {
        console.log(error);
      });
  }
}


class AccessRequest {
  constructor(userAgent: string, screenWidth: number, screenHeight: number, deviceType: string, ipAddress: string) {
    this._userAgent = userAgent;
    this._screenWidth = screenWidth;
    this._screenHeight = screenHeight;
    this._deviceType = deviceType;
    this._ipAddress = ipAddress;
  }

  private _userAgent: string;

  set userAgent(value: string) {
    this._userAgent = value;
  }

  private _screenWidth: number;

  set screenWidth(value: number) {
    this._screenWidth = value;
  }

  private _screenHeight: number;

  set screenHeight(value: number) {
    this._screenHeight = value;
  }

  private _deviceType: string;

  set deviceType(value: string) {
    this._deviceType = value;
  }

  private _ipAddress: string;

  set ipAddress(value: string) {
    this._ipAddress = value;
  }
}
