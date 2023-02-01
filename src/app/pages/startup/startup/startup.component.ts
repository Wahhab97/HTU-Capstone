import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StartupsService} from "../../../lib/services/startups/startups.service";
import {Startup} from "../../../lib/interfaces/startup";
import * as atlas from "azure-maps-control";
import {AuthenticationType} from "azure-maps-control";

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
  longitude = 32;
  latitude = 35;
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
            this.latitude = Number(this.startupObj.location.latitude);
            this.longitude = Number(this.startupObj.location.longitude);
            this.initMap();
          }
          else {
            this.router.navigate(['404']);
          }
        },
        error: err => console.error(err)
      })
    }
  }
  initMap() {
    let map = new atlas.Map('myMap', {
      center: [this.longitude, this.latitude],
      zoom: 12,
      language: 'en-US',
      authOptions: {
        authType: <AuthenticationType>'subscriptionKey',
        subscriptionKey: "32_w8g_zh4UWfC7MX02tEgD2-77cx6Yp399kg6ZTJaI"
      }
    });

    map.controls.add([
      new atlas.control.ZoomControl()
    ]);

    map.events.add('ready', () => {
      let dataSource = new atlas.source.DataSource();
      map.sources.add(dataSource);

      let layer = new atlas.layer.SymbolLayer(dataSource);
      map.layers.add(layer);
      dataSource.add(new atlas.data.Point([this.longitude, this.latitude]));
    })
  }
  goToSector(sector: string) {
    this.router.navigate(['sectors/'+ sector])
  }
}
