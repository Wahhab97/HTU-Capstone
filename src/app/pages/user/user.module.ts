import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RequestComponent } from './request/request.component';
import {StartupFormComponent} from "../../lib/components/startup-form/startup-form.component";
import {MaterialModule} from "../../material/material.module";


@NgModule({
  declarations: [
    RequestComponent,
    StartupFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
