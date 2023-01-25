import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Startup} from "../../interfaces/startup";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  requestCollection!: AngularFirestoreCollection<Startup>;

  constructor(private firestore: AngularFirestore) {
    this.requestCollection = this.firestore.collection<Startup>('Requests');
  }

  addRequest(startup: Startup) {
    from(this.requestCollection.add(startup));
  }
  getRequests(): Observable<Startup[]> {
    return this.firestore
      .collection<Startup>('Requests').valueChanges({"idField": 'id'})
  }
  deleteRequest(id: string) {
    return from(this.requestCollection.doc(id).delete())
  }
}
