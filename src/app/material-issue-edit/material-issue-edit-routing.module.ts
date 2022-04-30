import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialIssueEditPage } from './material-issue-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialIssueEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialIssueEditPageRoutingModule {}
