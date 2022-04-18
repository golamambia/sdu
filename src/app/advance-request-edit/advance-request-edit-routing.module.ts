import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvanceRequestEditPage } from './advance-request-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AdvanceRequestEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvanceRequestEditPageRoutingModule {}
