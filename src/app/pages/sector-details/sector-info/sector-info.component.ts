import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StartupsService} from "../../../lib/services/startups/startups.service";
import {Startup} from "../../../lib/interfaces/startup";

@Component({
  selector: 'app-sector-info',
  templateUrl: './sector-info.component.html',
  styleUrls: ['./sector-info.component.css']
})
export class SectorInfoComponent implements OnInit{
  constructor(private route: ActivatedRoute, private startupsService: StartupsService, private router: Router) { }
  name:string | null = "";
  source?: Startup[];
  comNum: number = 0;
  displayedColumns: string[] = ['name', 'founder', 'website', 'email', 'phone', 'city'];

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('sectorName');
    console.log(this.name);
    if(this.name){
      this.startupsService.getStartupsBySector(this.name).subscribe({
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
}
