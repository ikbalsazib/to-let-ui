import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CountyPopupModule } from 'src/app/shared/components/county-popup/county-popup.module';
import { UpcomingDialogModule } from 'src/app/shared/components/upcoming-dialog/upcoming-dialog.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header.component';
import {PipesModule} from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CountyPopupModule,
    FormsModule,
    UpcomingDialogModule,
    MaterialModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }