import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StartupsService} from "../../services/startups/startups.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, id: string}, private startupsService: StartupsService, private dialogRef: MatDialogRef<DeleteComponent>) {}
  confirm() {
    this.startupsService.deleteStartup(this.data.id);
    this.dialogRef.close(true);
  }
}
