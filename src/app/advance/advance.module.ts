import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvancePageRoutingModule } from './advance-routing.module';

import { AdvancePage } from './advance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvancePageRoutingModule
  ],
  declarations: [AdvancePage]
})
export class AdvancePageModule {}
