import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccessInformationComponent} from "./access-information.component";
import {AccessInformationRoutingModule} from "./access-information-routing.module";
import {DocumentViewComponent} from "./document-view/document-view.component";
import {MaterialModule} from "../material-module/material.module";


@NgModule({
  declarations: [
    AccessInformationComponent,
    DocumentViewComponent
  ],
  imports: [
    CommonModule,
    AccessInformationRoutingModule,
    MaterialModule
  ]
})
export class AccessInformationModule {
}
