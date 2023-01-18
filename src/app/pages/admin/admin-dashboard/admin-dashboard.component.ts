import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StartupsService} from "../../../lib/services/startups/startups.service";
import {Router} from "@angular/router";
import {SectorsService} from "../../../lib/services/sectors/sectors.service";
import {Startup} from "../../../lib/interfaces/startup";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit{

  startups: Startup[] = [];
  dataSource = new MatTableDataSource<Startup>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['logo', 'name', 'city', 'founder', 'numOfEmployees', 'yearOfEstablishment', 'website', 'email', 'phone']
  constructor(private startupService: StartupsService, private router: Router, private sectorsService: SectorsService) {}
  ngOnInit() {
    this.startupService.getStartups().subscribe({
      next: (value) => {
        if(value.length > 0) {
          this.startups = value;
          this.dataSource.data = this.startups;
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
