import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvancePage } from './advance.page';

const routes: Routes = [
  {
    path: '',
    component: AdvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancePageRoutingModule {}
