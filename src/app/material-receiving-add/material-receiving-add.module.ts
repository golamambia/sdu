import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialReceivingAddPageRoutingModule } from './material-receiving-add-routing.module';

import { MaterialReceivingAddPage } from './material-receiving-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialReceivingAddPageRoutingModule
  ],
  declarations: [MaterialReceivingAddPage]
})
export class MaterialReceivingAddPageModule {}
