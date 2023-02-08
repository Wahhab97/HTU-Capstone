import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Startup} from "../../interfaces/startup";
import {first, from, Observable} from "rxjs";
import {SectorsService} from "../sectors/sectors.service";
import {Sector} from "../../interfaces/sector";

@Injectable({
  providedIn: 'root'
})
export class StartupsService {
  startupsCollection!: AngularFirestoreCollection<Startup>;
  constructor(private firestore: AngularFirestore, private sectorsService: SectorsService) {
    this.startupsCollection = this.firestore.collection('Startups');
  }

  addStartup(startup: Startup) {
    from(this.startupsCollection.add(startup));
  }
  getStartupById(id: string) {
    return this.startupsCollection.doc(id).get();
  }
  getStartups(): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>("Startups").valueChanges({"idField":'id'});
  }
  getStartupsBySector(sectorName: String): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>("Startups", ref => ref.where("sector", "array-contains", sectorName)).valueChanges({"idField":'id'});
  };
  getStartupsBySectors(sectorsArray: string[]): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>("Startups", ref => ref.where("sector", "array-contains-any", sectorsArray)).valueChanges({"idField":'id'})
  }
  getStartupByName(name: string): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>('Startups', ref => ref.where("companyName", "==", name)).valueChanges({"idField":'id'});
  }

  updateStartup(id: string, startup: {}){
    return from(this.startupsCollection.doc(id).update({...startup}));
  }
  deleteStartup(id: string){
    return from(this.startupsCollection.doc(id).delete());
  }
}
