import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorDetailsRoutingModule } from './sector-details-routing.module';
import { SectorInfoComponent } from './sector-info/sector-info.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    SectorInfoComponent
  ],
    imports: [
        CommonModule,
        SectorDetailsRoutingModule,
        MatTableModule
    ]
})
export class SectorDetailsModule { }
