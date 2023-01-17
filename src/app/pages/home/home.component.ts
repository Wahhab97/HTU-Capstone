import {Component, OnInit} from '@angular/core';
import {FilestorageService} from "../../lib/services/storage/filestorage.service";
import {StartupsService} from "../../lib/services/startups/startups.service";
import {SectorsService} from "../../lib/services/sectors/sectors.service";
import {Sector} from "../../lib/interfaces/sector";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private storage: FilestorageService, private startupsService: StartupsService, private sectorsService: SectorsService) {
  }

  sectorsArray: Sector[] = [];

  ngOnInit() {
    this.sectorsService.getSectors().subscribe((response) => {
      if(response) {
        this.sectorsArray = response;
      }
    });
  }
}
