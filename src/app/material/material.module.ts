import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

const materials = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule
]

@NgModule({
  declarations: [],
  exports: [...materials],
  imports: [...materials]
})
export class MaterialModule { }
