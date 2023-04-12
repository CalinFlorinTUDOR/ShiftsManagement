import { NgIf } from '@angular/common';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean;
  admin: boolean;

  // adding existing user 

  private existingWorker = new BehaviorSubject<string>('');
  uid = this.existingWorker.asObservable();

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;
    afAuth.authState;
    this.admin = false;

    this.afAuth.onAuthStateChanged((worker) => {
      if (worker) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  // register method

  registerWorker(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        result.user.sendEmailVerification();
      })
      .catch((error) => {
        // console.log('Auth Service: sigup error', error);
        if (error.code) {
          return { isValid: false, message: error.message };
        } else {
          return false;
        }
      });
  }

  // login method

  loginWorker(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // console.log('Auth Service: loginWorker: success');
        this.afAuth.onAuthStateChanged((user) => {
          localStorage.setItem('userUID', user.uid);

          if (user && user.email.includes('admin')) {
            this.admin = true;
            this.router.navigate(['/workers-home']);
          } else {
            this.admin = false;
            this.router.navigate(['/workers-home']);
          }
        });
      })
      .catch((error) => {

        // console.log('Auth Service:login error...');
        // console.log('error code', error.code);
        // console.log('error, error');
        if (error.code) {
          return { isValid: false, message: error.message };
        } else {
          return false;
        }
      });
  }

  // replace user method

  replaceWorker(uid: string) {
    this.existingWorker.next(uid);
  }

   // retrieve user method from data

  async getCurentUser(): Promise<string> {
    let uid: any;

    await this.afAuth.currentUser.then((res) => {
      if (res) {
        uid = res.uid;
      } else {
        uid = '';
      }
    });

    return uid;
  }
}



