import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {locationMatcher, locationValidator} from "./locationValidator";
import * as events from "events";

@Component({
  selector: 'app-create-startup',
  templateUrl: './create-startup.component.html',
  styleUrls: ['./create-startup.component.css']
})
export class CreateStartupComponent {
  constructor(private router: Router) {}

  startupsForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    logo: new FormControl(),
    city: new FormControl("", [Validators.required]),
    founder: new FormControl(""),
    numOfEmployees: new FormControl(0),
    website: new FormControl(""),
    email: new FormControl("", [Validators.email]),
    phone: new FormControl(""),
    latitude: new FormControl(0, [Validators.min(0), Validators.max(180)]),
    longitude: new FormControl(0,[Validators.min(0), Validators.max(360)])
  }, [locationValidator]);

  matcher = new locationMatcher();

  get name() {
    return this.startupsForm.get('name');
  }
  get city() {
    return this.startupsForm.get('city');
  }
  get founder() {
    return this.startupsForm.get('founder');
  }
  get numOfEmployees() {
    return this.startupsForm.get('numOfEmployees');
  }
  get website() {
    return this.startupsForm.get('website');
  }
  get email() {
    return this.startupsForm.get('email');
  }
  get phone() {
    return this.startupsForm.get('phone');
  }
  get latitude() {
    return this.startupsForm.get('latitude');
  }
  get longitude() {
    return this.startupsForm.get('longitude');
  }
  imgSrc = "";
  preview(event:any) {
    let x = (event as HTMLInputElement).files;
    if(x && x.length > 0) {
      let fileReader = new FileReader();
      let j = fileReader.readAsDataURL(x[0])
      console.log(j);
      // this.imgSrc = event.result;
      // console.log(event.)
    };
  }

  createStartup() {
    console.log(this.startupsForm)
  }
}
