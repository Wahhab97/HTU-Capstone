import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StartupsService} from "../../services/startups/startups.service";
import {RequestsService} from "../../services/requests/requests.service";
import {FilestorageService} from "../../services/storage/filestorage.service";
import {first, Subject, takeUntil} from "rxjs";
import {Sector} from "../../interfaces/sector";
import {SectorsService} from "../../services/sectors/sectors.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, id: string, caller: string, url: string}, private sectorsService: SectorsService, private startupsService: StartupsService, private requestsService: RequestsService, private storage: FilestorageService,private dialogRef: MatDialogRef<DeleteComponent>) {}
  confirm() {
    if(this.data.caller === "view-requests"){
      this.requestsService.deleteRequest(this.data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(()=>{
        this.storage.deleteFile(this.data.url).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
          this.dialogRef.close(true);
        });
      });
    } else if (this.data.caller === "admin-dashboard") {
      this.startupsService.getStartupById(this.data.id).subscribe({
        next: (value) => {
          let x = value.get("sector") as string[];
          x.forEach((sec) => {
            this.sectorsService.getSectorByName(sec).pipe(first()).subscribe((response:Sector[]) => {
              if(response){
                if(response[0].id) {
                  let id = response[0].id;
                  this.sectorsService.changeSectorCount(id, response[0].count-1);
                }
              }
            });
          })
        },
        complete: () => {
          this.startupsService.deleteStartup(this.data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(()=>{
            this.storage.deleteFile(this.data.url).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
              this.dialogRef.close(true);
            });
          });
        }
      });

    }
  }
  ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
