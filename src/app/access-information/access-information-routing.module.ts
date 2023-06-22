import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccessInformationComponent} from "./access-information.component";

const routes: Routes = [
  {path: ':token', component: AccessInformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessInformationRoutingModule {
}
