import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Startup} from "../../interfaces/startup";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StartupsService {
  starupsCollection!: AngularFirestoreCollection<Startup>;
  constructor(private firestore: AngularFirestore) {
    this.starupsCollection = this.firestore.collection('Startups');
  }

  addStartup(startup: Startup) {
    from(this.starupsCollection.add(startup));
  }
  getStartupsBySector(sectorName: String): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>("Startups", ref => ref.where("sector", "array-contains", sectorName)).valueChanges();
  };
  getStartupByName(name: string): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>('Startups', ref => ref.where("companyName", "==", name)).valueChanges();
  }
}
