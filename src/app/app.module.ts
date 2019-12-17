import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

const config = {
      apiKey: "AIzaSyB6TkRSVOJtM5UyTuLTR5fol6YNNcsAAk4",
      authDomain: "apiproyect-237217.firebaseapp.com",
      databaseURL: "https://apiproyect-237217.firebaseio.com",
      projectId: "apiproyect-237217",
      storageBucket: "apiproyect-237217.appspot.com",
      messagingSenderId: "406120644059",
      appId: "1:406120644059:web:7d6a822a237ec7e776bbfe"
};

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, Mat} from '@angular/material';

@NgModule({
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(config, 'api-project-332270236992'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
