import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {CreateAdminComponent} from "./create-admin/create-admin.component";
import {SuperAdminAuthGuard} from "../../lib/guards/super-admin-auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    pathMatch: "full"
  },
  {
    path: 'createAdmin',
    component: CreateAdminComponent,
    canLoad: [SuperAdminAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
