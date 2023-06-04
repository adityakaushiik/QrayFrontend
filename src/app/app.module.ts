import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./utils/material.module";
import {DashboardComponent} from './qray-entry/content/dashboard/dashboard.component';
import {SignupComponent} from './signup/signup.component';
import {QrayEntryComponent} from './qray-entry/qray-entry.component';
import {NavbarComponent} from './qray-entry/navbar/navbar.component';
import {SidenavComponent} from './qray-entry/sidenav/sidenav.component';
import {HttpClientModule} from '@angular/common/http';
import {ContentComponent} from './qray-entry/content/content.component';
import {AttendanceComponent} from './qray-entry/content/attendance/attendance.component';
import {DocumentsComponent} from './qray-entry/content/documents/documents.component';
import {AttendersDetailsComponent} from './qray-entry/content/attendance/attenders-details/attenders-details.component';
import {QrCodeComponent} from './qray-entry/content/attendance/qr-code/qr-code.component';
import {AddDocumentComponent} from './qray-entry/content/documents/add-document/add-document.component';
import {AccessInformationComponent} from './access-information/access-information.component';
import {CommonModule} from "@angular/common";
import {DocumentViewComponent} from "./access-information/document-view/document-view.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    QrayEntryComponent,
    NavbarComponent,
    SidenavComponent,
    ContentComponent,
    AttendanceComponent,
    DocumentsComponent,
    AttendersDetailsComponent,
    QrCodeComponent,
    AddDocumentComponent,
    AccessInformationComponent,
    DocumentViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
