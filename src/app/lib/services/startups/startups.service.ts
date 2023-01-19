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
      .collection<Startup>("Startups").valueChanges();
  }
  getStartupsBySector(sectorName: String): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>("Startups", ref => ref.where("sector", "array-contains", sectorName)).valueChanges();
  };
  getStartupsBySectors(sectorsArray: string[]): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>("Startups", ref => ref.where("sector", "array-contains-any", sectorsArray)).valueChanges()
  }
  getStartupByName(name: string): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>('Startups', ref => ref.where("companyName", "==", name)).valueChanges();
  }
}
