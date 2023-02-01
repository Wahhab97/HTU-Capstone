import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Startup} from "../../../lib/interfaces/startup";
import {MatPaginator} from "@angular/material/paginator";
import {RequestsService} from "../../../lib/services/requests/requests.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteComponent} from "../../../lib/components/delete/delete.component";
import {StartupsService} from "../../../lib/services/startups/startups.service";

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit, AfterViewInit{
  constructor(private requestsService: RequestsService, private startupsService: StartupsService, public dialog: MatDialog) {}
  dataSource = new MatTableDataSource<Startup>([]);
  displayedColumns = ['logo', 'name', 'city', 'founder', 'numOfEmployees', 'yearOfEstablishment', 'website', 'email', 'phone', 'actions']


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  startupsObserver = {
    next: (value: Startup[]) => {
      if(value[0]) {
        this.dataSource.data = value;
        return;
      } else {
        this.dataSource.data = [];
      }
    },
    error: (err: Error) => console.error(err)
  };

  ngOnInit() {
    this.requestsService.getRequests().subscribe(this.startupsObserver);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  reject(startupName: string, requestId: string, logoUrl: string){
    let dialogRef = this.dialog.open(DeleteComponent,{
      width: '500px',
      data: {name: startupName, id: requestId, caller: "view-requests", url: logoUrl}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.requestsService.getRequests().subscribe(this.startupsObserver);
    });
  }
  approve(request: Startup){
    this.startupsService.addStartup({...request});
    this.requestsService.deleteRequest(request.id+"").subscribe(() => {
      this.requestsService.getRequests().subscribe(this.startupsObserver);
      console.log(request);
    });

  }
}
