import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'attendence',
    loadChildren: () => import('./attendence/attendence.module').then( m => m.AttendencePageModule)
  },
  {
    path: 'attendence-single',
    loadChildren: () => import('./attendence-single/attendence-single.module').then( m => m.AttendenceSinglePageModule)
  },
  {
    path: 'attendence-single-edit',
    loadChildren: () => import('./attendence-single-edit/attendence-single-edit.module').then( m => m.AttendenceSingleEditPageModule)
  },
  {
    path: 'attendence-expense',
    loadChildren: () => import('./attendence-expense/attendence-expense.module').then( m => m.AttendenceExpensePageModule)
  },
  {
    path: 'attendence-expense-edit',
    loadChildren: () => import('./attendence-expense-edit/attendence-expense-edit.module').then( m => m.AttendenceExpenseEditPageModule)
  },
  {
    path: 'attendence-expense-add',
    loadChildren: () => import('./attendence-expense-add/attendence-expense-add.module').then( m => m.AttendenceExpenseAddPageModule)
  },
  {
    path: 'attendence-b',
    loadChildren: () => import('./attendence-b/attendence-b.module').then( m => m.AttendenceBPageModule)
  },
  {
    path: 'attendence-b-edit',
    loadChildren: () => import('./attendence-b-edit/attendence-b-edit.module').then( m => m.AttendenceBEditPageModule)
  },
  {
    path: 'attendence-b-add',
    loadChildren: () => import('./attendence-b-add/attendence-b-add.module').then( m => m.AttendenceBAddPageModule)
  },
  {
    path: 'attendence-b-update',
    loadChildren: () => import('./attendence-b-update/attendence-b-update.module').then( m => m.AttendenceBUpdatePageModule)
  },
  {
    path: 'wallet-page',
    loadChildren: () => import('./wallet-page/wallet-page.module').then( m => m.WalletPagePageModule)
  },
  {
    path: 'return-request',
    loadChildren: () => import('./return-request/return-request.module').then( m => m.ReturnRequestPageModule)
  },
  {
    path: 'return-request-create',
    loadChildren: () => import('./return-request-create/return-request-create.module').then( m => m.ReturnRequestCreatePageModule)
  },
  {
    path: 'workexpense-list',
    loadChildren: () => import('./workexpense-list/workexpense-list.module').then( m => m.WorkexpenseListPageModule)
  },
  {
    path: 'user-attendense-list',
    loadChildren: () => import('./user-attendense-list/user-attendense-list.module').then( m => m.UserAttendenseListPageModule)
  },
  {
    path: 'workexpense-edit',
    loadChildren: () => import('./workexpense-edit/workexpense-edit.module').then( m => m.WorkexpenseEditPageModule)
  },
  {
    path: 'sallery-list',
    loadChildren: () => import('./sallery-list/sallery-list.module').then( m => m.SalleryListPageModule)
  },
  {
    path: 'leave-page',
    loadChildren: () => import('./leave-page/leave-page.module').then( m => m.LeavePagePageModule)
  },
  {
    path: 'generale-leave',
    loadChildren: () => import('./generale-leave/generale-leave.module').then( m => m.GeneraleLeavePageModule)
  },
  {
    path: 'medical-leave',
    loadChildren: () => import('./medical-leave/medical-leave.module').then( m => m.MedicalLeavePageModule)
  },
  {
    path: 'compact-leave',
    loadChildren: () => import('./compact-leave/compact-leave.module').then( m => m.CompactLeavePageModule)
  },
  {
    path: 'attendence-report',
    loadChildren: () => import('./attendence-report/attendence-report.module').then( m => m.AttendenceReportPageModule)
  },
  {
    path: 'advance',
    loadChildren: () => import('./advance/advance.module').then( m => m.AdvancePageModule)
  },
  {
    path: 'advance-request-add',
    loadChildren: () => import('./advance-request-add/advance-request-add.module').then( m => m.AdvanceRequestAddPageModule)
  },
  {
    path: 'advance-request-edit',
    loadChildren: () => import('./advance-request-edit/advance-request-edit.module').then( m => m.AdvanceRequestEditPageModule)
  },
  {
    path: 'material-issue-list',
    loadChildren: () => import('./material-issue-list/material-issue-list.module').then( m => m.MaterialIssueListPageModule)
  },
  {
    path: 'material-issue-add',
    loadChildren: () => import('./material-issue-add/material-issue-add.module').then( m => m.MaterialIssueAddPageModule)
  },
  {
    path: 'material-issue-edit',
    loadChildren: () => import('./material-issue-edit/material-issue-edit.module').then( m => m.MaterialIssueEditPageModule)
  },
  {
    path: 'material-issue-view',
    loadChildren: () => import('./material-issue-view/material-issue-view.module').then( m => m.MaterialIssueViewPageModule)
  },
  {
    path: 'material-receiving-list',
    loadChildren: () => import('./material-receiving-list/material-receiving-list.module').then( m => m.MaterialReceivingListPageModule)
  },
  {
    path: 'material-receiving-add',
    loadChildren: () => import('./material-receiving-add/material-receiving-add.module').then( m => m.MaterialReceivingAddPageModule)
  },
  {
    path: 'material-receiving-edit',
    loadChildren: () => import('./material-receiving-edit/material-receiving-edit.module').then( m => m.MaterialReceivingEditPageModule)
  },
  {
    path: 'material-receiving-view',
    loadChildren: () => import('./material-receiving-view/material-receiving-view.module').then( m => m.MaterialReceivingViewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
