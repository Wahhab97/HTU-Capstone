import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {last, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilestorageService {
  constructor(private fireStorage: AngularFireStorage) { }

  uploadFile(path: string,file: File) {
    const filePath = `${path}/${file.name}`;
    const storageRef = this.fireStorage.ref(filePath);
    return storageRef.put(file).snapshotChanges()
      .pipe(
        last(),
        switchMap((val) => {
          return storageRef.getDownloadURL();
        })
      );
  }
  deleteFile(url: string) {
    return this.fireStorage.refFromURL(url).delete();
  }
}
