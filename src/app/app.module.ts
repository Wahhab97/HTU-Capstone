import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './lib/components/header/header.component';
import { FooterComponent } from './lib/components/footer/footer.component';
import {MaterialModule} from "./material/material.module";
import { LayoutComponent } from './lib/components/layout/layout.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/screens/not-found/not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAn4rQPWvc_cpg7XHTmnQwyGN9cmlLtxYg",
      authDomain: "htu-capstone-ward.firebaseapp.com",
      projectId: "htu-capstone-ward",
      storageBucket: "htu-capstone-ward.appspot.com",
      messagingSenderId: "617961194466",
      appId: "1:617961194466:web:9922986ef23f93b18aafbb",
      measurementId: "G-580QD58264"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
