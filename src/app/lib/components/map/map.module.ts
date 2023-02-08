import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputMapComponent} from "./input-map/input-map.component";



@NgModule({
  declarations: [
    InputMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputMapComponent
  ],
})
export class MapModule { }
