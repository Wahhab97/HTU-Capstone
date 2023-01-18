import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup/startup.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    StartupComponent
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    MatButtonModule
  ]
})
export class StartupModule { }
