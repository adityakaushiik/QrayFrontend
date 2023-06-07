import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DocumentInfo} from "../models/DocumentInfo";
import {DeviceInfo} from "../models/DeviceInfo";


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
    return this.http.get('https://api64.ipify.org?format=json');
  }

  retrieveDeviceInformationAndIP() {
    console.log('retrieveDeviceInformationAndIP');
    let deviceInfo: DeviceInfo = {
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      deviceType: /Mobile/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      ipAddress: ''
    };

    this.getIPAddress().subscribe((response: any) => {
      deviceInfo.ipAddress = response.ip;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
      this.getData(deviceInfo);
    });
  }


  getData(deviceInfo: DeviceInfo) {
    console.log(deviceInfo);
    if (this.token == null) {
      console.log('token is null');
      return;
    }
    this.http.post('http://43.205.195.167:8080/api/qrLink/access', deviceInfo, {
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
