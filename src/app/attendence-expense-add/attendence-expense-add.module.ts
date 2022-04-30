import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceExpenseAddPageRoutingModule } from './attendence-expense-add-routing.module';

import { AttendenceExpenseAddPage } from './attendence-expense-add.page';
import { AddexpensePopoverComponent } from '../component/addexpense-popover/addexpense-popover.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceExpenseAddPageRoutingModule, 
     
  ],
  declarations: [AttendenceExpenseAddPage]
})
export class AttendenceExpenseAddPageModule {}
