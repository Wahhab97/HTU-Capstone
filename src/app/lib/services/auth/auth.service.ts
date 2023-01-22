import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {of, switchMap} from "rxjs";
import { User } from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private fs: AngularFirestore) { }
  userState$ = this.fireAuth.authState.pipe(
    switchMap((val)=>{
      if(!val) {
        return of(null);
      } else {
        return this.fs.collection<User>('Users').doc(val.uid).valueChanges();
      }
    })
  );

  signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(firstName: string, lastName: string, email: string, password: string, role: 'admin'|'user'|'super-admin' ) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((val) => {
      let user: User = {
        id: val.user?.uid,
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email
      };
      return this.fs.collection<User>('Users').doc(val.user?.uid).set(user);
    });
  }

  logOut() {
    return this.fireAuth.signOut();
  }
}
