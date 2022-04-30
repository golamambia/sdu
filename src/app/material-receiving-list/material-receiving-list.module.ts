import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialReceivingListPageRoutingModule } from './material-receiving-list-routing.module';

import { MaterialReceivingListPage } from './material-receiving-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialReceivingListPageRoutingModule
  ],
  declarations: [MaterialReceivingListPage]
})
export class MaterialReceivingListPageModule {}
