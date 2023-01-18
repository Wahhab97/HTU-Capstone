import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StartupsService} from "../../../lib/services/startups/startups.service";
import {Startup} from "../../../lib/interfaces/startup";

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit{
  constructor(private route: ActivatedRoute, private startupsService: StartupsService, private router: Router) {}

  name: string|null = "";
  startupObj?: any;
  showObj: Startup = {
    companyName: "",
    sector: [],
    logo:"",
    city:""
  };
  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('startupName');
    if(this.name) {
      this.startupsService.getStartupByName(this.name).subscribe({
        next: (value) => {
          if(value[0]) {
            this.startupObj = value[0];
            for(let property in this.startupObj) {
              if(this.startupObj[property] !== "undefined"){
                this.showObj[property] = this.startupObj[property];
              }
            }
            console.log(this.showObj);
          }
          else {
            this.router.navigate(['404']);
          }
        },
        error: err => console.error(err)
      })
    }
  }

  goToSector(sector: string) {
    this.router.navigate(['sectors/'+ sector])
  }
}
