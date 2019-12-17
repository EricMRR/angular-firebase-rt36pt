import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
  modules: any;

  constructor(public db: AngularFireDatabase) {
    this.db.list('appModules').valueChanges().subscribe(val => { this.modules = val; });
  }

  ngOnInit() {
  }
}
