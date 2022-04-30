import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialReceivingListPage } from './material-receiving-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialReceivingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialReceivingListPageRoutingModule {}
