import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Sector} from "../../interfaces/sector";
import {Router} from "@angular/router";
import {StartupsService} from "../../services/startups/startups.service";
import {Startup} from "../../interfaces/startup";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private startupsService: StartupsService) {}
  @Input() childSector: Sector = {sectorName:"", count:0};

  startups: Startup[] = [];
  ngOnInit() {
    this.startupsService.getStartupsBySector(this.childSector.sectorName).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (value:Startup[]) => {
        if(value[0]) {
          this.startups = value;
        }
      }
    });
  }

  goToSector(val:string) {
    this.router.navigate(["sectors/"+val]);
  }
  ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
