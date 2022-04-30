import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialIssueViewPageRoutingModule } from './material-issue-view-routing.module';

import { MaterialIssueViewPage } from './material-issue-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialIssueViewPageRoutingModule
  ],
  declarations: [MaterialIssueViewPage]
})
export class MaterialIssueViewPageModule {}
