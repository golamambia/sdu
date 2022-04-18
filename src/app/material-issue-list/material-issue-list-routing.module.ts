import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialIssueListPage } from './material-issue-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialIssueListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialIssueListPageRoutingModule {}
