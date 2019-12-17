import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-application-start',
  templateUrl: './application-start.component.html',
  styleUrls: ['./application-start.component.css']
})

export class ApplicationStartComponent implements OnInit {
  categories: any;

  constructor(public db: AngularFireDatabase) { 
    this.db.list('categories').valueChanges().subscribe(val => { this.categories = val; });
  }

  ngOnInit() {
  }
}