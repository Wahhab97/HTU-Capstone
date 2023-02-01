import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StartupsService} from "../../services/startups/startups.service";
import {RequestsService} from "../../services/requests/requests.service";
import {FilestorageService} from "../../services/storage/filestorage.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, id: string, caller: string, url: string}, private startupsService: StartupsService, private requestsService: RequestsService, private storage: FilestorageService,private dialogRef: MatDialogRef<DeleteComponent>) {}
  confirm() {
    if(this.data.caller === "view-requests"){
      this.requestsService.deleteRequest(this.data.id).subscribe(()=>{
        this.storage.deleteFile(this.data.url).subscribe(() => {
          this.dialogRef.close(true);
        });
      });
    } else if (this.data.caller === "admin-dashboard") {
      this.startupsService.deleteStartup(this.data.id).subscribe(()=>{
        this.storage.deleteFile(this.data.url).subscribe(() => {
          this.dialogRef.close(true);
        });
      });
    }
  }
}
