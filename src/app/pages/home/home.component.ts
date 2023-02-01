import {Component, OnInit} from '@angular/core';
import {FilestorageService} from "../../lib/services/storage/filestorage.service";
import {StartupsService} from "../../lib/services/startups/startups.service";
import {SectorsService} from "../../lib/services/sectors/sectors.service";
import {Sector} from "../../lib/interfaces/sector";
import Chart from  "chart.js/auto"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private storage: FilestorageService, private startupsService: StartupsService, private sectorsService: SectorsService) {
  }

  sectorsArray: Sector[] = [];
  chart: any;
  labels: any[] =[];
  chartData: any[] =[];
  legendDisplay = true;

  ngOnInit() {
    this.sectorsService.getSectors().subscribe((response) => {
      if(response) {
        this.sectorsArray = response;
        this.sectorsArray.forEach((sector: Sector) => {
          this.chartData.push(sector.count);
          this.labels.push(sector.sectorName);
        });
        window.innerWidth >= 500 ? this.legendDisplay = true: this.legendDisplay = false;
        this.createChart();
        console.log(this.chart);
      }
    });
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
}
