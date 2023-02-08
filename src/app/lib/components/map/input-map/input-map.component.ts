import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as atlas from "azure-maps-control";
import {AuthenticationType} from "azure-maps-control";

@Component({
  selector: 'app-input-map',
  templateUrl: './input-map.component.html',
  styleUrls: ['./input-map.component.css']
})
export class InputMapComponent implements OnInit{
  ngOnInit() {
    this.initMap();
  }
  @Output() newLocationEvent = new EventEmitter();
  pinLocation(pos:number[]) {
    this.newLocationEvent.emit(pos);
  }
  longitude = 35.9106;
  latitude = 31.9539;

  initMap() {
    let map = new atlas.Map('map', {
      center: [this.longitude, this.latitude],
      zoom: 12,
      language: 'en-US',
      authOptions: {
        authType: <AuthenticationType>'subscriptionKey',
        subscriptionKey: "32_w8g_zh4UWfC7MX02tEgD2-77cx6Yp399kg6ZTJaI"
      }
    });

    map.controls.add([
      new atlas.control.ZoomControl()
    ]);

    map.events.add('ready', () => {
      let marker = new atlas.HtmlMarker({
        draggable: true,
        htmlContent: '<image src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1717245/ylw-pushpin.png" style="pointer-events: none;" />',
        position: [this.longitude, this.latitude],
        pixelOffset: [6, -15]
      });

      map.events.add('drag', marker, () => {
        let pos = marker.getOptions().position;
        if(pos &&pos[0] && pos[1]){
          this.longitude = pos[0];
          this.latitude = pos[1];
        }
      });

      map.markers.add(marker);
    });
  }
}
