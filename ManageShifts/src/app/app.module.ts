import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { WorkersRegisterComponent } from './components/workers-mode/workers-register/workers-register.component';
import { WorkersLoginComponent } from './components/workers-mode/workers-login/workers-login.component';
import { WorkersHomeComponent } from './components/workers-mode/workers-home/workers-home.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { VerifyEmailComponent } from './components/workers-mode/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/workers-mode/forgot-password/forgot-password.component';
import { ShiftsComponent } from './components/workers-mode/workers-home/shifts/shifts.component';
import { AddShiftsComponent } from './components/workers-mode/workers-home/add-shifts/add-shifts.component';
import { EditProfileComponent } from './components/workers-mode/workers-home/edit-profile/edit-profile.component';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@NgModule({
  declarations: [
    AppComponent,
    WorkersRegisterComponent,
    WorkersLoginComponent,
    WorkersHomeComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ShiftsComponent,
    AddShiftsComponent,
    EditProfileComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    provideAuth(() => getAuth())
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
