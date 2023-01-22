import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {CreateAdminComponent} from "./create-admin/create-admin.component";
import {SuperAdminAuthGuard} from "../../lib/guards/super-admin-auth.guard";
import {CreateStartupComponent} from "./create-startup/create-startup.component";
import {EditStartupComponent} from "./edit-startup/edit-startup.component";

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    pathMatch: "full"
  },
  {
    path: 'createAdmin',
    component: CreateAdminComponent,
    canActivate: [SuperAdminAuthGuard]
  },
  {
    path: 'createStartup',
    component: CreateStartupComponent
  },
  {
    path: 'edit/:startupName',
    component: EditStartupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
