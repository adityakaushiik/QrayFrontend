import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {QrayEntryComponent} from "./qray-entry/qray-entry.component";
import {DashboardComponent} from "./qray-entry/content/dashboard/dashboard.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ContentComponent} from "./qray-entry/content/content.component";
import {AttendanceComponent} from "./qray-entry/content/attendance/attendance.component";
import {DocumentsComponent} from "./qray-entry/content/documents/documents.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent},
  {
    path: 'access',
    loadChildren: () => import('./access-information/access-information.module').then(m => m.AccessInformationModule)
  },
  {
    path: '', component: QrayEntryComponent, canActivate: [AuthGuardService], children: [
      {
        path: '', component: ContentComponent, children: [
          {path: '', component: DashboardComponent},
          {path: 'attendance', component: AttendanceComponent},
          {path: 'documents', component: DocumentsComponent},
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
