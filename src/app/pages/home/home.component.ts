import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FilestorageService} from "../../lib/services/storage/filestorage.service";
import {StartupsService} from "../../lib/services/startups/startups.service";
import {SectorsService} from "../../lib/services/sectors/sectors.service";
import {Sector} from "../../lib/interfaces/sector";
import Chart from  "chart.js/auto"
import {MatChipListbox} from "@angular/material/chips";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(private storage: FilestorageService, private startupsService: StartupsService, private sectorsService: SectorsService) {
  }
  @ViewChild(MatChipListbox) listBox?: MatChipListbox;

  sectorsArray: Sector[] = [];
  sectorsToDisplay: Sector[] = [];
  chart: any;
  labels: any[] =[];
  chartData: any[] =[];
  legendDisplay = true;

  ngOnInit() {
    this.sectorsService.getSectors().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if(response) {
        this.sectorsArray = response;
        this.sectorsToDisplay = [...this.sectorsArray];
        this.sectorsArray.forEach((sector: Sector) => {
          this.chartData.push(sector.count);
          this.labels.push(sector.sectorName);
        });

        window.innerWidth >= 500 ? this.legendDisplay = true: this.legendDisplay = false;
        this.createChart();
      }
    });
  }
  listBoxChange() {
    if(this.listBox) {
      if(this.listBox.value as string[] && this.listBox.value[0]) {
        this.sectorsToDisplay = [];

        this.listBox.value.forEach((element: string) => {
          this.sectorsArray.forEach((sector: Sector) => {
            if(sector.sectorName == element) {
              this.sectorsToDisplay.push(sector);
            }
          });
        });
      } else {
        this.sectorsToDisplay = [...this.sectorsArray];
      }
    } else {
      this.sectorsToDisplay = [...this.sectorsArray];
    }
  }
  createChart() {
    this.chart = new Chart("PieChart", {
      type: "doughnut",
      data: {
        labels: this.labels,
        datasets:[{
          label: "Startups in Sector",
          data: this.chartData,
          hoverOffset: 4
        }],
      },
      options:{
        plugins:{
          legend: {
            display: this.legendDisplay
          }
        }
      }
    });
  }
  ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
