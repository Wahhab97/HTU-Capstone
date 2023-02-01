import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {locationMatcher, locationValidator} from "../../../pages/admin/create-startup/locationValidator";
import {Sector} from "../../interfaces/sector";
import {SectorsService} from "../../services/sectors/sectors.service";
import {FilestorageService} from "../../services/storage/filestorage.service";
import {RequestsService} from "../../services/requests/requests.service";
import {StartupsService} from "../../services/startups/startups.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-startup-form',
  templateUrl: './startup-form.component.html',
  styleUrls: ['./startup-form.component.css']
})
export class StartupFormComponent implements OnInit{
  constructor(
    private sectorsService: SectorsService,
    private storage: FilestorageService,
    private requestsService: RequestsService,
    private startupsService: StartupsService,
    private router: Router
  ) {}

  @Input() sPath = "";
  @Input() cPath = "";
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

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
    latitude: new FormControl(0, [Validators.max(90), Validators.min(-90)]),
    longitude: new FormControl(0,[Validators.max(180), Validators.min(-180)])
  }, [locationValidator]);

  matcher = new locationMatcher();

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
    this.sectorsService.getSectors().subscribe({
      next: (value:Sector[]) => {
        if(value) {
          value.forEach((sec) => {
            this.sectors.push(sec.sectorName);
          })
        }
      },
      error: (err: Error) => console.error(err)
    });
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

  uploadStartupObserver = {
    next: (value:string) => {
      if(this.sector) {
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
        })
      }
    },
    error: (err: Error) => {console.error("Image upload error " + err)},
  };
  uploadRequestObserver = {
    next: (value:string) => {
      if(this.sector) {
        return this.requestsService.addRequest({
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
        })
      }
    },
    error: (err: Error) => {console.error("Image upload error " + err)},
    complete: () => {
      this.formDirective.resetForm();
      this.imgSrc = "";
    }
  };
  submitForm(){
    if(this.cPath === "Requests") {
      this.storage.uploadFile(this.sPath+'', this.fileToUpload)
        .subscribe(this.uploadRequestObserver);
    } else if (this.cPath === "Startups"){
      this.storage.uploadFile(this.sPath+'', this.fileToUpload)
        .subscribe(this.uploadStartupObserver);
    }
    this.router.navigate(['']);
  }
}
