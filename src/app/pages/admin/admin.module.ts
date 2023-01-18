import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { CreateStartupComponent } from './create-startup/create-startup.component';
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FiltersComponent} from "../../lib/components/filters/filters.component";


@NgModule({
    declarations: [
        AdminDashboardComponent,
        CreateAdminComponent,
        CreateStartupComponent,
        FiltersComponent
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
