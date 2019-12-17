import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from './environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, Mat} from '@angular/material';

import { TopBarComponent } from '../top-bar/top-bar.component';

@NgModule({
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,MatInputModule
    ,RouterModule.forRoot([
      /*{ path: '', component: ApplicationStartComponent },
      { path: 'legal', component: ApplicationLegalComponent },
      { path: 'account', component: AccountManagementComponent },
      { path: 'account_register', component: AccountRegisterComponent },
      { path: 'social_chat', component: SocialChatComponent },
      { path: 'social_chat/:user', component: SocialChatComponent },
      { path: 'social_forum', component: SocialForumComponent },
      { path: 'social_forum/:topic', component: SocialForumComponent },*/
    ])
  ],
  declarations: [
    AppComponent
    , TopBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
