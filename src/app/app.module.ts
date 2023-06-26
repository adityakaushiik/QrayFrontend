import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material-module/material.module";
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
import {CommonModule} from "@angular/common";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {
  CreateNewQrDialogComponent
} from "./qray-entry/content/dashboard/create-new-qr-dialog/create-new-qr-dialog.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {CdkVirtualScrollableElement} from "@angular/cdk/scrolling";
import {MatMenuModule} from "@angular/material/menu";
import {ConfirmDialogComponent} from './utils/confirm-dialog/confirm-dialog.component';
import {UserDetailBottomSheetComponent} from './utils/user-detail-bottom-sheet/user-detail-bottom-sheet.component';
import {QrScannerComponent} from './qray-entry/content/attendance/qr-scanner/qr-scanner.component';
import { EnterAttendanceNameComponent } from './qray-entry/content/attendance/enter-attendance-name/enter-attendance-name.component';

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
    CreateNewQrDialogComponent,
    ConfirmDialogComponent,
    UserDetailBottomSheetComponent,
    QrScannerComponent,
    EnterAttendanceNameComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    CdkVirtualScrollableElement,
    MatMenuModule,
  ],
  // SocketIoModule.forRoot(config)
  // WebSocketService
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
