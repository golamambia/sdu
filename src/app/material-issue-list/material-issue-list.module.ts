import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialIssueListPageRoutingModule } from './material-issue-list-routing.module';

import { MaterialIssueListPage } from './material-issue-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialIssueListPageRoutingModule
  ],
  declarations: [MaterialIssueListPage]
})
export class MaterialIssueListPageModule {}
