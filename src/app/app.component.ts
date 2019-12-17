import { Component } from '@angular/core';
//import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { map } from 'rxjs/operators'
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
//import { auth } from 'firebase/app';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  items: Observable<any[]>;

  ui: firebaseui.auth.AuthUI;

  pendingRequest: Boolean = false;

  val:string;

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) 
  {
    try {
      this.db.firestore.enablePersistence();
    } catch (e) { 
      console.dir(e);
    }

    try {
      this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
      if (this.ui.isPendingRedirect()) {
        this.pendingRequest = true;
        this.login();
      }
    } catch(e) {
      //this.ui =firebaseui.auth.AuthUI.getInstance(this.afAuth.auth);
      //console.dir(this.ui)
    }

    
    this.items = db.collection('items').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }

  add(name) {
    console.dir(name);
    this.db.collection('items').add({ name })
  }

  del(item) {
    this.db.collection('items').doc(item.id).delete();
  }

  login() {
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        {
          //provider: auth.EmailAuthProvider.PROVIDER_ID,
          provider: auth.PhoneAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
        //auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        },

      }
    }
    this.ui.start('#firebaseui-auth-container', uiConfig);
    /*
        this.afAuth.auth.signInWithEmailAndPassword('nicolas@thomasson.fr', "123456");*/
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
