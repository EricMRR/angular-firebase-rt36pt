import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})

export class AccountRegisterComponent implements OnInit {
  logonServices: any;
  accountTypes: any;

  constructor(public db: AngularFireDatabase) {
    this.state = this.getState();

    this.db.list('logonServices').valueChanges().subscribe(val => { this.logonServices = val; });
    this.db.list('accountTypes').valueChanges().subscribe(val => { this.accountTypes = val; });
  }

  state: any

  ngOnInit() {
  }

  getState(){
    var state = {
      service: null
      , gender: null
      , accountType: null
    };
    return state;
  }
  startRegistry(service){
    this.state.service = service;
  }
  setAccountType(_type){
    if(this.state.accountType == _type) this.state.accountType = null;
    else this.state.accountType = _type;
  }
  cancel(){
    this.state = this.getState();
  }
}