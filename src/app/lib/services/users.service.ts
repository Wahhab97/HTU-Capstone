import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {User} from "../interfaces/user";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userCollection!: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = this.firestore.collection("Users");
  }
  addUser(user: User) {
    from(this.userCollection.add(user))
  }
  getUsers(): Observable<User[]> {
    return this.userCollection.valueChanges();
  }
}
