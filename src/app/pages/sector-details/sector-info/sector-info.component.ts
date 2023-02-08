import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StartupsService} from "../../../lib/services/startups/startups.service";
import {Startup} from "../../../lib/interfaces/startup";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-sector-info',
  templateUrl: './sector-info.component.html',
  styleUrls: ['./sector-info.component.css']
})
export class SectorInfoComponent implements OnInit, OnDestroy{
  constructor(private route: ActivatedRoute, private startupsService: StartupsService, private router: Router) { }
  name:string | null = "";
  source?: Startup[];
  comNum: number = 0;
  displayedColumns: string[] = ['name', 'founder', 'website', 'email', 'phone', 'city'];

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('sectorName');
    if(this.name){
      this.startupsService.getStartupsBySector(this.name).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: value => {
          if(value) {
            this.source = value;
            this.comNum = this.source.length;
          }
        },
        error: err => console.error(err)
    });
    }
  }
  comDetails(row: Startup) {
    this.router.navigate(['startups/'+ row.companyName]);
  }
  ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
