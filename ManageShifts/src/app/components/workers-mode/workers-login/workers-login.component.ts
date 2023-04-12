import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workers-login',
  templateUrl: './workers-login.component.html',
  styleUrls: ['./workers-login.component.css']
})
export class WorkersLoginComponent implements OnInit{
  loginForm!: FormGroup;
  firebaseErrorMessage: string;
  authService: any;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private auth: AuthService) { 
    this.loginForm = new FormGroup ({

      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])

    });
    this.firebaseErrorMessage = '';
  }

  ngOnInit() {

    this.auth.loginWorker(this.loginForm.value.email, this.loginForm.value.password);
  }

  onSubmit() {

    
  }

    loginUser(): void {

      if (this.loginForm.invalid) {
      
    return;
    
  }
    
  this.auth.loginWorker(this.loginForm.value.email, this.loginForm.value.password).then((res) =>{
    if(res == null){
      // alert('logging in !');
    } else if(res == false){
      // console.log('login error', result);
      alert('login error');
      this.firebaseErrorMessage = res.message;
    }
    
  })

    }

}





