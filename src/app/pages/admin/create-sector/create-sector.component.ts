import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SectorsService} from "../../../lib/services/sectors/sectors.service";

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.css']
})
export class CreateSectorComponent {
  constructor(private dialogRef: MatDialogRef<CreateSectorComponent>, private sectorsService: SectorsService) {}
  create(nameOfSector: string) {
    if(nameOfSector) {
      this.sectorsService.addSector({sectorName: nameOfSector, count: 0});
    }
    else {
      console.error('Enter a valid name!')
    }
  }
}
