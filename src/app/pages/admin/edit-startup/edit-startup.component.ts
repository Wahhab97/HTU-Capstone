import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Startup} from "../../../lib/interfaces/startup";
import {Observable, switchMap} from "rxjs";
import {StartupsService} from "../../../lib/services/startups/startups.service";
import {SectorsService} from "../../../lib/services/sectors/sectors.service";
import {Sector} from "../../../lib/interfaces/sector";
import {FilestorageService} from "../../../lib/services/storage/filestorage.service";

@Component({
  selector: 'app-edit-startup',
  templateUrl: './edit-startup.component.html',
  styleUrls: ['./edit-startup.component.css']
})
export class EditStartupComponent implements OnInit{
  startup?: Startup;
  comparisonStartup?: Startup
  startup$?: Observable<Startup[] | undefined>;
  startupName!: string;
  constructor(private route: ActivatedRoute, private router: Router, private startupsService: StartupsService, private sectorsService: SectorsService, private storage: FilestorageService) {
    this.startup$ = this.route.paramMap.pipe(
      switchMap((value) => {
        this.startupName = value.get('startupName')+'';
        return this.startupsService.getStartupByName(this.startupName)
      })
    );
    this.startup$.subscribe({
      next: (value:Startup[] | undefined) => {
        if(value) {
          if(value[0]){
            this.startup = value[0];
            this.comparisonStartup = {...value[0]};
            this.editStartupForm.patchValue({
              name: this.startup.companyName,
              // logo:this.startup.logo,
              sector: this.startup.sector,
              city: this.startup.city,
              founder: this.startup.founder || "",
              yearOfEstablishment: this.startup.yearOfEstablishment,
              numOfEmployees: Number(this.startup.numOfEmployees),
              website: this.startup.website || '',
              email: this.startup.email || "",
              phone: this.startup.phone || "",
              latitude: Number(this.startup.location?.latitude),
              longitude: Number(this.startup.location?.longitude)
            });
            this.imgSrc = this.startup.logo;
          }
        }
      },
      error: (err:Error) => console.error(err)
    })
  }

  editStartupForm = new FormGroup({
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
    return this.editStartupForm.get('name')?.value;
  }
  get city() {
    return this.editStartupForm.get('city')?.value;
  }
  get sector() {
    return this.editStartupForm.get('sector')?.value;
  }
  get founder() {
    return this.editStartupForm.get('founder')?.value;
  }
  get numOfEmployees() {
    return this.editStartupForm.get('numOfEmployees')?.value;
  }
  get yearOfEstablishment() {
    return this.editStartupForm.get('yearOfEstablishment')?.value;
  }
  get website() {
    return this.editStartupForm.get('website')?.value;
  }
  get email() {
    return this.editStartupForm.get('email')?.value;
  }
  get phone() {
    return this.editStartupForm.get('phone')?.value;
  }
  get latitude() {
    return this.editStartupForm.get('latitude')?.value;
  }
  get longitude() {
    return this.editStartupForm.get('longitude')?.value;
  }
  sectors: String[] = [];
  imgSrc = "";
  fileToUpload:any;
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
  ngOnInit() {
    this.sectorsService.getSectors().subscribe({
      next: (value:Sector[]) => {
        if(value) {
          value.forEach((element:Sector) => {
            this.sectors.push(element.sectorName);
          })
        }
      }
    })
  }

  updateStartup() {
    if (this.editStartupForm.controls.logo.value && this.startup) {
      this.storage.deleteFile(this.startup.logo).subscribe({
        next: () => {
          this.storage.uploadFile(this.fileToUpload).subscribe({
            next: (value) => {
              if (this.sector && this.startup) {
                return this.startupsService.updateStartup(this.startup.id + "", {
                  companyName: this.name + "",
                  logo: value,
                  sector: this.sector,
                  city: this.city + "",
                  founder: this.founder + "",
                  numOfEmployees: this.numOfEmployees + "",
                  yearOfEstablishment: this.yearOfEstablishment + "",
                  website: this.website + "",
                  email: this.email + "",
                  phone: this.phone + "",
                  location: {
                    longitude: this.longitude + "",
                    latitude: this.latitude + ""
                  }
                });
              }
              return;
            },
            error: (err: Error) => console.error(err),
          })
        }
      })
    }
    this.router.navigate(['']);
  }
}
