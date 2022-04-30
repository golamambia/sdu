import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialReceivingViewPageRoutingModule } from './material-receiving-view-routing.module';

import { MaterialReceivingViewPage } from './material-receiving-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialReceivingViewPageRoutingModule
  ],
  declarations: [MaterialReceivingViewPage]
})
export class MaterialReceivingViewPageModule {}
