import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RequestComponent } from './request/request.component';
import {StartupFormComponent} from "../../lib/components/startup-form/startup-form.component";
import {MaterialModule} from "../../material/material.module";
import {InputMapComponent} from "../../lib/components/input-map/input-map.component";


@NgModule({
  declarations: [
    RequestComponent,
    StartupFormComponent,
    InputMapComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        MaterialModule,
    ]
})
export class UserModule { }
