import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Sector} from "../../interfaces/sector";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  sectorsCollection!: AngularFirestoreCollection<Sector>
  constructor(private fireStore: AngularFirestore) {
    this.sectorsCollection = this.fireStore.collection('Sectors');
  }

  addSector(sector: Sector) {
    from(this.sectorsCollection.add(sector));
  }

}
