import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvanceRequestAddPage } from './advance-request-add.page';

const routes: Routes = [
  {
    path: '',
    component: AdvanceRequestAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvanceRequestAddPageRoutingModule {}
