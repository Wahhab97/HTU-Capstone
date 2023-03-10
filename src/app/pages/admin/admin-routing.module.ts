import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {CreateAdminComponent} from "./create-admin/create-admin.component";
import {SuperAdminAuthGuard} from "../../lib/guards/super-admin-auth.guard";
import {CreateStartupComponent} from "./create-startup/create-startup.component";
import {EditStartupComponent} from "./edit-startup/edit-startup.component";
import {ViewRequestsComponent} from "./view-requests/view-requests.component";
import {ViewSectorsComponent} from "./view-sectors/view-sectors.component";

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
  },
  {
    path: "requests",
    component: ViewRequestsComponent
  },
  {
    path: "sectors",
    component: ViewSectorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
