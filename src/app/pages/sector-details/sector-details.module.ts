import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorDetailsRoutingModule } from './sector-details-routing.module';
import { SectorInfoComponent } from './sector-info/sector-info.component';
import {MatTableModule} from "@angular/material/table";
// import {FiltersComponent} from "../../lib/components/filters/filters.component";


@NgModule({
  declarations: [
    SectorInfoComponent,
    // FiltersComponent
  ],
    imports: [
        CommonModule,
        SectorDetailsRoutingModule,
        MatTableModule
    ]
})
export class SectorDetailsModule { }
