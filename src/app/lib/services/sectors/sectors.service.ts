import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Sector} from "../../interfaces/sector";
import {from, Observable} from "rxjs";

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
  getSectorByName(sectorName: string): Observable<Sector[]> {
    return this.fireStore
      .collection<Sector>('Sectors', ref => ref.where('sectorName', 'array-contains', sectorName)).valueChanges({"idField": "id"})
  }
  getSectors():Observable<Sector[]> {
    return this.fireStore
      .collection<Sector>('Sectors').valueChanges({'idField': 'id'});
  }
  changeSectorCount(id: string, newCount: number) {
    return this.sectorsCollection.doc(id).update({count: newCount});
  }
  deleteSector(id: string) {
    return this.sectorsCollection.doc(id).delete();
  }
}
