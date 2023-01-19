import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Startup} from "../../interfaces/startup";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StartupsService {
  startupsCollection!: AngularFirestoreCollection<Startup>;
  constructor(private firestore: AngularFirestore) {
    this.startupsCollection = this.firestore.collection('Startups');
  }

  addStartup(startup: Startup) {
    from(this.startupsCollection.add(startup));
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
  deleteStartup(id: string){
    return from(this.startupsCollection.doc(id).delete());
  }
}
