import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvanceRequestEditPageRoutingModule } from './advance-request-edit-routing.module';

import { AdvanceRequestEditPage } from './advance-request-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvanceRequestEditPageRoutingModule
  ],
  declarations: [AdvanceRequestEditPage]
})
export class AdvanceRequestEditPageModule {}
