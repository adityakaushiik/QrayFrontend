import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponse} from "../models/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public user: Observable<LoginResponse>;
  public userSubject: BehaviorSubject<LoginResponse>;

  // private baseUrl = 'http://65.2.169.108:8080/api/';

  private baseUrl = 'http://localhost:8080/api/';

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

  logout() {
    localStorage.removeItem('QrayUser');
    this.userSubject.next({} as LoginResponse);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public getUserBasicDetails() {
    return this.http.get<any>(this.baseUrl + 'documents/userDetails', {
      headers: this.header
    });
  }

  public deleteDocument(documentId: string, documentReference: string) {
    return this.http.delete(this.baseUrl + 'documents', {
      params: {documentId: documentId, documentReference: documentReference},
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

  public createAttendance() {
    return this.http.get<any>(this.baseUrl + 'attendance/create', {
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

  public markAttendance(attendanceId: string, attendersId: string) {
    return this.http.get(this.baseUrl + 'attendance/mark', {
      params: {attendanceId: attendanceId, attenderId: attendersId},
      headers: this.header
    });
  }

  public removeAttendance(attendanceId: string, attendersId: string) {
    return this.http.delete(this.baseUrl + 'attendance/delete', {
      params: {attendanceId: attendanceId, attenderId: attendersId},
      headers: this.header
    });
  }
}
