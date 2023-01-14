import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Startup} from "../../interfaces/startup";
import {from} from "rxjs";

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
}
