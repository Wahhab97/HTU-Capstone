import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {NotFoundComponent} from "./pages/screens/not-found/not-found.component";
import {AdminAuthGuard} from "./lib/guards/admin-auth.guard";
import {NoAuthGuard} from "./lib/guards/no-auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    canActivate: [NoAuthGuard]
  },
  {
    path: "about",
    component: AboutComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: "auth",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: "admin",
    loadChildren: () => import("./pages/admin/admin.module")
      .then(m => m.AdminModule),
    canLoad: [AdminAuthGuard]
  },
  {
    path: "sectors",
    loadChildren: () => import("./pages/sector-details/sector-details.module")
      .then(m => m.SectorDetailsModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: "startups",
    loadChildren: () => import("./pages/startup/startup.module")
      .then(m => m.StartupModule)
  },

  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
