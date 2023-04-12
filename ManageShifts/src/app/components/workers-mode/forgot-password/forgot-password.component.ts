import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userRecover: FormGroup;
  email: any;
  


  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router,) { 
    
    this.userRecover = this.fb.group({
      email: ['', Validators.required]
    })
  }
  
  ngOnInit(): void {
    
  }

  recover() {
    const email = this.userRecover.value.email;

    
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      
      this.router.navigate(['/workers-login']);

    }).catch((error) => {

      
    })
    
  }

}
