import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SectorInfoComponent} from "./sector-info/sector-info.component";

const routes: Routes = [
  {path:":sectorName", component: SectorInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorDetailsRoutingModule { }
