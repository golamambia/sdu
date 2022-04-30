import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialReceivingEditPage } from './material-receiving-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialReceivingEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialReceivingEditPageRoutingModule {}
