import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialIssueAddPageRoutingModule } from './material-issue-add-routing.module';

import { MaterialIssueAddPage } from './material-issue-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialIssueAddPageRoutingModule
  ],
  declarations: [MaterialIssueAddPage]
})
export class MaterialIssueAddPageModule {}
