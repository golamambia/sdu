import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialReceivingAddPage } from './material-receiving-add.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialReceivingAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialReceivingAddPageRoutingModule {}
