import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SectorsService} from "../../../lib/services/sectors/sectors.service";
import {Sector} from "../../../lib/interfaces/sector";
import {MatDialog} from "@angular/material/dialog";
import {CreateSectorComponent} from "../create-sector/create-sector.component";

@Component({
  selector: 'app-view-sectors',
  templateUrl: './view-sectors.component.html',
  styleUrls: ['./view-sectors.component.css']
})
export class ViewSectorsComponent implements OnInit, AfterViewInit{
  constructor(private sectorsService: SectorsService, public dialog: MatDialog) {}
  dataSource = new MatTableDataSource<Sector>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['sectorName', 'startupsCount'];

  sectorObserver ={
    next: (val: Sector[]) => {
      if(val[0]) {
        this.dataSource.data = val;
      }
    },
    error: (err: Error) => console.error(err),
  }
  ngOnInit() {
    this.sectorsService.getSectors().subscribe(this.sectorObserver);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  createSector() {
    let dialogRef = this.dialog.open(CreateSectorComponent,{
      width: "500px",
      maxWidth: "95%",
    });
    dialogRef.afterClosed().subscribe(() => {
      this.sectorsService.getSectors().subscribe(this.sectorObserver);
    })
  }
}