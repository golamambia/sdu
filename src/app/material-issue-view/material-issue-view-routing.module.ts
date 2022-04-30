import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialIssueViewPage } from './material-issue-view.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialIssueViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialIssueViewPageRoutingModule {}
