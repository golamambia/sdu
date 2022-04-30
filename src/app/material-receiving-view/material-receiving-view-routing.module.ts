import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialReceivingViewPage } from './material-receiving-view.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialReceivingViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialReceivingViewPageRoutingModule {}
