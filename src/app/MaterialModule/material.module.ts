import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatChipsModule} from "@angular/material/chips";


const MaterialComponents = [
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatListModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  CdkVirtualScrollViewport,
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  MatGridListModule,
  MatTableModule,
  MatTabsModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatChipsModule,
];

@NgModule({
  imports: [
    MaterialComponents,
    MatDatepickerModule,
    MatNativeDateModule],
  exports: [MaterialComponents],
  providers: [MatDatepickerModule]
})
export class MaterialModule {
}
