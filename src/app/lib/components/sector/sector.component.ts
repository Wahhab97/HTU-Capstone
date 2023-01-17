import {Component, Input} from '@angular/core';
import {Sector} from "../../interfaces/sector";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent {
  constructor(private router: Router) {}
  @Input() childSector: Sector = {sectorName:"", count:0};

  goToSector(val:string) {
    this.router.navigate(["sectors/"+val]);
  }
}
