import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {NotFoundComponent} from "./pages/screens/not-found/not-found.component";

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "about", component: AboutComponent},
  {path: "auth", loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)},

  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
