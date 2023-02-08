import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {locationMatcher, locationValidator} from "./locationValidator";
import {FilestorageService} from "../../../lib/services/storage/filestorage.service";
import {StartupsService} from "../../../lib/services/startups/startups.service";
import {SectorsService} from "../../../lib/services/sectors/sectors.service";
import {Sector} from "../../../lib/interfaces/sector";
import {first, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-startup',
  templateUrl: './create-startup.component.html',
  styleUrls: ['./create-startup.component.css']
})
export class CreateStartupComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private storage: FilestorageService, private startupsService: StartupsService, private sectorsService:SectorsService) {

  }

  startupsForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    logo: new FormControl(),
    sector: new FormControl([''], [Validators.required]),
    city: new FormControl("", [Validators.required]),
    founder: new FormControl(""),
    numOfEmployees: new FormControl(0),
    yearOfEstablishment: new FormControl(),
    website: new FormControl(""),
    email: new FormControl("", [Validators.email]),
    phone: new FormControl(""),
    latitude: new FormControl(0, [Validators.min(0), Validators.max(90), Validators.min(-90)]),
    longitude: new FormControl(0,[Validators.min(0), Validators.max(180), Validators.min(-180)])
  });


  get name() {
    return this.startupsForm.get('name')?.value;
  }
  get city() {
    return this.startupsForm.get('city')?.value;
  }
  get sector() {
    return this.startupsForm.get('sector')?.value;
  }
  get founder() {
    return this.startupsForm.get('founder')?.value;
  }
  get numOfEmployees() {
    return this.startupsForm.get('numOfEmployees')?.value;
  }
  get yearOfEstablishment() {
    return this.startupsForm.get('yearOfEstablishment')?.value;
  }
  get website() {
    return this.startupsForm.get('website')?.value;
  }
  get email() {
    return this.startupsForm.get('email')?.value;
  }
  get phone() {
    return this.startupsForm.get('phone')?.value;
  }
  get latitude() {
    return this.startupsForm.get('latitude')?.value;
  }
  get longitude() {
    return this.startupsForm.get('longitude')?.value;
  }
  sectors: String[] = [];
  imgSrc = "";
  fileToUpload:any;

  ngOnInit() {
    this.sectorsService.getSectors().pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (value:Sector[]) => {
        if(value) {
          value.forEach((sec) => {
            this.sectors.push(sec.sectorName);
          })
        }
      },
      error: err => console.error(err)
    });
  }
  changeLoc(loc: any) {
    this.startupsForm.patchValue({
      longitude: loc[0],
      latitude: loc[1]
    })
  }
  preview(target: any) {
    if(target.files) {
      this.fileToUpload = target.files.item(0);

      let reader =  new FileReader();
      reader.onload = (event:any)=> {
        this.imgSrc = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  createStartup() {
    this.storage.uploadFile('logos',this.fileToUpload).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (value) => {
        if(this.sector) {
          this.sector.forEach((sector:string) => {
            this.sectorsService.getSectorByName(sector).pipe(first()).subscribe((response:Sector[]) => {
              if(response){
                if(response[0].id) {
                  let id = response[0].id;
                  this.sectorsService.changeSectorCount(id, response[0].count+1);
                }
              }
            });
          });
          return this.startupsService.addStartup({
            companyName: this.name+"",
            logo: value,
            sector: this.sector,
            city: this.city+"",
            founder: this.founder+"",
            numOfEmployees: this.numOfEmployees+"",
            yearOfEstablishment: this.yearOfEstablishment+"",
            website: this.website+"",
            email: this.email+"",
            phone: this.phone+"",
            location: {
              longitude: this.longitude+"",
              latitude: this.latitude+""
            }
          });
        }
      },
      error: (err) => {console.error("Image upload error " + err)},
      complete: () =>  this.router.navigate(['admin/'])
    });
  }
  ngUnsubscribe = new Subject<void>();
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
