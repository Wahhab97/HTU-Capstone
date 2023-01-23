import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestComponent} from "./request/request.component";

const routes: Routes = [
  {path: ":id", component: RequestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
