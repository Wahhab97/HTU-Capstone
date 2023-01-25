import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RequestsService} from "../../../lib/services/requests/requests.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  constructor(
    private route: ActivatedRoute,
    private requestsService: RequestsService,
  ) {}
  storagePath = 'logos';
  collectionPath = 'Requests';

}
