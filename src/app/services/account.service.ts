import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponse} from "../models/LoginResponse";
import {accessUrl, baseUrl} from "../endpoints";
import {MarkAttendance} from "../qray-entry/content/attendance/qr-scanner/qr-scanner.component";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public user: Observable<LoginResponse>;
  public userSubject: BehaviorSubject<LoginResponse>;
  public accessUrl = accessUrl;
  private baseUrl = baseUrl;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<LoginResponse>(JSON.parse(
      localStorage.getItem('QrayUser') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  // public get uid() {
  //   return this.userSubject.value.uid;
  // }

  private get accessToken() {
    return this.userSubject.value.accessToken;
  }

  private get header() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.accessToken
    });
  }


  login(email: string, password: string) {
    return this.http.post<LoginResponse>(this.baseUrl + 'user/login',

      {email: email, password: password},

      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    ).pipe(map(user => {
      localStorage.setItem('QrayUser', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }


  //
  // email: string,
  // password: string,
  // firstName: string,
  // lastName: string,
  // phone: number,
  // country: string,
  // state: string
  //
  signup(value: any) {
    return this.http.post(this.baseUrl + 'user/register', value, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  logout() {
    localStorage.removeItem('QrayUser');
    this.userSubject.next({} as LoginResponse);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public getUserBasicDetails(attendersId?: string | null) {
    return this.http.get<any>(this.baseUrl + 'user/userDetails', {
      headers: this.header,
      params: {userId: (attendersId) ? attendersId : 0}
    });
  }

  public updateUserBasicDetails(data: Map<string, string>) {
    return this.http.put(this.baseUrl + 'user/updateUserDetails', data, {
      headers: this.header
    });
  }

  public deleteDocument(documentId: string | undefined, documentReference: string) {
    return this.http.delete(this.baseUrl + 'documents/delete', {
      params: {documentId: (documentId) ? documentId : 'asfbaksfj', documentReference: documentReference},
      headers: this.header
    });
  }

  public downloadDocument(documentReference: string) {
    return this.http.post<string>(this.baseUrl + 'documents/download/', documentReference, {
      headers: this.header
    });
  }

  public getDocumentsListing() {
    return this.http.get<any>(this.baseUrl + 'documents/getDocuments', {
      headers: this.header
    });
  }

  public updateDocument(document: FormData, documentReference: string) {
    return this.http.put(this.baseUrl + 'documents', document, {
      params: {documentReference: documentReference},
      headers: this.header
    });
  }

  public uploadDocument(documentType: string, document: File) {
    let formData = new FormData();
    formData.append('document', document);
    formData.append('documentType', documentType);

    return this.http.post(this.baseUrl + 'documents/upload', formData, {
      headers: this.header
    });
  }

  public createAttendance(name: string) {
    return this.http.get<any>(this.baseUrl + 'attendance/create', {
      params: {name: name},
      headers: this.header
    });
  }

  public deleteAttendance(attendanceId: string) {
    return this.http.delete(this.baseUrl + 'attendance/delete', {
      params: {attendanceId: attendanceId},
      headers: this.header
    });
  }


  public getAttendanceListing(attendanceId?: string | null) {
    return this.http.get<any>(this.baseUrl + 'attendance/get', {
      params: {attendanceId: (attendanceId) ? attendanceId : 0},
      headers: this.header
    });
  }

  public markAttendance(uid: string, markAttendance: MarkAttendance) {
    return this.http.post(this.baseUrl + 'attendance/mark', markAttendance, {
      params: {uid: uid},
      headers: this.header
    });
  }

  public removeAttendance(attendanceId: string, recordId: string) {
    return this.http.delete(this.baseUrl + 'attendance/remove', {
      params: {attendanceId: attendanceId, recordId: recordId},
      headers: this.header
    });
  }

  public getQrLinksListing() {
    return this.http.get<any>(this.baseUrl + 'qrLink/get', {
      headers: this.header
    });
  }

  public createQrLink(type: string, sessionName: string, validTime: number, documentIds: string[]) {
    return this.http.post<any>(this.baseUrl + 'qrLink/create', documentIds, {
      params: {
        type: type,
        sessionName: sessionName,
        validTime: validTime
      },
      headers: this.header
    });
  }

  public deleteQrLink(qrLinkId: string) {
    return this.http.delete(this.baseUrl + 'qrLink/delete', {
      params: {qrId: qrLinkId},
      headers: this.header
    });
  }
}
