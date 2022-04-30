import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialIssueEditPageRoutingModule } from './material-issue-edit-routing.module';

import { MaterialIssueEditPage } from './material-issue-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialIssueEditPageRoutingModule
  ],
  declarations: [MaterialIssueEditPage]
})
export class MaterialIssueEditPageModule {}
