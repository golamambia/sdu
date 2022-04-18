import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialIssueAddPage } from './material-issue-add.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialIssueAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialIssueAddPageRoutingModule {}
