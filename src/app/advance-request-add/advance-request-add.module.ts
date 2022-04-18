import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvanceRequestAddPageRoutingModule } from './advance-request-add-routing.module';

import { AdvanceRequestAddPage } from './advance-request-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvanceRequestAddPageRoutingModule
  ],
  declarations: [AdvanceRequestAddPage]
})
export class AdvanceRequestAddPageModule {}
