import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StartupsService} from "../../../lib/services/startups/startups.service";
import {Router} from "@angular/router";
import {SectorsService} from "../../../lib/services/sectors/sectors.service";
import {Startup} from "../../../lib/interfaces/startup";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Filter} from "../../../lib/interfaces/filter";
import {MatDialog} from "@angular/material/dialog";
import {DeleteComponent} from "../../../lib/components/delete/delete.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit, OnDestroy{
  dataSource = new MatTableDataSource<Startup>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['logo', 'name', 'city', 'founder', 'numOfEmployees', 'yearOfEstablishment', 'website', 'email', 'phone', 'actions']
  constructor(private startupService: StartupsService, private router: Router, private sectorsService: SectorsService, public dialog: MatDialog) {}
  ngOnInit() {
    this.startupService.getStartups().pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.startupsObserver);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  startupsObserver = {
    next: (value: Startup[]) => {
      if(value[0]) {
        this.dataSource.data = value;
        return;
      }
    },
    error: (err: Error) => console.error(err)
  };
  addedFilter(filter: Filter) {
    if(filter) {
      if(filter.comName) {
        this.startupService.getStartupByName(filter.comName).pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.startupsObserver);
      } else if(filter.sectors) {
        if(filter.sectors[0]){
           this.startupService.getStartupsBySectors(filter.sectors).pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.startupsObserver);
        }
      }
    }
  }
  deleteStartup(startupName: string, startupId: string, url: string){
    let dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: {name: startupName, id: startupId, caller: 'admin-dashboard', url: url}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.startupService.getStartups().pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.startupsObserver);
    })
  }
  ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
