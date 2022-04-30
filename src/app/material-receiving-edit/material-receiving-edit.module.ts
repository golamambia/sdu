import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialReceivingEditPageRoutingModule } from './material-receiving-edit-routing.module';

import { MaterialReceivingEditPage } from './material-receiving-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialReceivingEditPageRoutingModule
  ],
  declarations: [MaterialReceivingEditPage]
})
export class MaterialReceivingEditPageModule {}
