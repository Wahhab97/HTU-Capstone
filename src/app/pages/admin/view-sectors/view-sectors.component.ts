import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SectorsService} from "../../../lib/services/sectors/sectors.service";
import {Sector} from "../../../lib/interfaces/sector";
import {MatDialog} from "@angular/material/dialog";
import {CreateSectorComponent} from "../create-sector/create-sector.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-view-sectors',
  templateUrl: './view-sectors.component.html',
  styleUrls: ['./view-sectors.component.css']
})
export class ViewSectorsComponent implements OnInit, AfterViewInit, OnDestroy{
  constructor(private sectorsService: SectorsService, public dialog: MatDialog) {}
  dataSource = new MatTableDataSource<Sector>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['sectorName', 'startupsCount', 'delete'];

  sectorObserver ={
    next: (val: Sector[]) => {
      if(val[0]) {
        this.dataSource.data = val;
      }
    },
    error: (err: Error) => console.error(err),
  }
  ngOnInit() {
    this.sectorsService.getSectors().pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.sectorObserver);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  deleteSector(id: string, count: number) {
    if(count < 1) {
      this.sectorsService.deleteSector(id);
      return;
    }else {
      console.error("You can't delete a sector that has companies");
    }
  }
  createSector() {
    let dialogRef = this.dialog.open(CreateSectorComponent,{
      width: "500px",
      maxWidth: "95%",
    });
    dialogRef.afterClosed().subscribe(() => {
      this.sectorsService.getSectors().pipe(takeUntil(this.ngUnsubscribe));
    })
  }
  ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
