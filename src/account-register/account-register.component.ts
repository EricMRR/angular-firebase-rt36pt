import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

//import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { map } from 'rxjs/operators'
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})

export class AccountRegisterComponent implements OnInit {
  state: any
  logonServices: any;
  accountTypes: any;

  //items: Observable<any[]>;
  ui: firebaseui.auth.AuthUI;
  pendingRequest: Boolean = false;

  constructor(public db: AngularFireDatabase, public fs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.state = this.getState();

    try {
      this.fs.firestore.enablePersistence();
    } catch (e) { 
      //console.dir(e);
    }

    try {
      //this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
      this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
      if (this.ui.isPendingRedirect()) {
        this.pendingRequest = true;
        //this.login();
      }
    } catch(e) {
      console.log("Error al crear la UI");

      //this.ui =firebaseui.auth.AuthUI.getInstance(this.afAuth.auth);
      //console.dir(this.ui)
      //console.dir(e)
    }
    
    /*this.items = fs.collection('items').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      }))
    )*/

    this.db.list('logonServices').valueChanges().subscribe(val => { this.logonServices = val; });
    this.db.list('accountTypes').valueChanges().subscribe(val => { this.accountTypes = val; });
  }

  ngOnInit() {
  }

  getState(){
    var state = {
      service: null
      , gender: null
      , accountType: null
      , user: null
    };
    return state;
  }
  startRegistry(service){

    //aqui comenzamos con el registro del usuario asi que vamos a hacer lo mismo que hacia antes la cosa esa     

    this.state.service = service;
    this.login();
    //seteamos el tipo que necesitamos... mostramos la interfaz y esperamos

  }
  setAccountType(_type){
    if(this.state.accountType == _type) this.state.accountType = null;
    else this.state.accountType = _type;
  }
  cancel(){
    this.state = this.getState();
    try{
      this.ui.reset();
      this.ui.delete();
      this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    }catch(e){ }
    //document.getElementById("firebaseui-auth-container").innerHTML = "";
  }

  getAuthProvider(){
    if(this.state.service.id == 1) return auth.PhoneAuthProvider.PROVIDER_ID;
    if(this.state.service.id == 2) return auth.EmailAuthProvider.PROVIDER_ID;
    if(this.state.service.id == 3) return auth.GoogleAuthProvider.PROVIDER_ID;
    if(this.state.service.id == 4) return auth.FacebookAuthProvider.PROVIDER_ID;
    if(this.state.service.id == 5) return auth.TwitterAuthProvider.PROVIDER_ID;
    else return null;
  }

  login() {
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: this.getAuthProvider(),
          requireDisplayName: true
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.

          this.state.user = authResult.user;

          console.log(authResult);
          //console.log(redirectUrl);

          return false;
        },

      }
    }
    this.ui.start('#firebaseui-auth-container', uiConfig);
    //this.afAuth.auth.signInWithEmailAndPassword('nicolas@thomasson.fr', "123456");
  }

}