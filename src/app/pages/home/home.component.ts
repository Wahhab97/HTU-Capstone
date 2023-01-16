import { Component } from '@angular/core';
import data from '../screens/not-found/companies.json'
import {FilestorageService} from "../../lib/services/storage/filestorage.service";
import {StartupsService} from "../../lib/services/startups/startups.service";
import {SectorsService} from "../../lib/services/sectors/sectors.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private storage: FilestorageService, private startupsService: StartupsService, private sectorsService: SectorsService) {
  }
  //


}
