import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-workers-register',
  templateUrl: './workers-register.component.html',
  styleUrls: ['./workers-register.component.css']
})
export class WorkersRegisterComponent implements OnInit {
  setForm = new FormGroup ({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    fname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password2nd: new FormControl('', [Validators.required, Validators.minLength(6)]),
    age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(130)])
  });
  pass1 = '';
  pass2 = '';
  errorMessage = '';
  router: any;
  authService: any;
  firebaseErrorMessage: any;

  constructor(private fb: FormBuilder, private firebaseAuth: AngularFireAuth, private route : Router, private data : DataService, private af :AuthService) {

    this.firebaseErrorMessage = '';
  }


  async setUser(email, password):Promise<any> {
    try {
      const res = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      let lowerEmail;
      res.user.sendEmailVerification();
      this.verifyEmail();
    } catch (error) {
      console.log('Signup Error:', error);
      if (error.code) {
        return { isValid: false, message: error.message };
      }
      return null;
    }
  }
  
  verifyEmail() {
    this.firebaseAuth.currentUser.then((user) => user?.sendEmailVerification()).then(() => {
      alert('User registered successfully ! We send you a link for your email verification !')
    })
    this.router.navigate(['/workers-login'])
  }
  ngOnInit() {

    
  }

  

  matchPassword(): boolean {
    return this.pass1 === this.pass2;
  }
  
  onSubmit() {

    this.setUser(this.setForm.value.email, this.setForm.value.password)

    if (this.matchPassword()) {
      return;
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  mustMatch(password: any, confirmPassword: any) {
        return (FormGroup: FormGroup) => {
          const passwordControl = FormGroup.controls[password];
          const confirmPasswordControls = FormGroup.controls[confirmPassword];
    
          if (
            confirmPasswordControls.errors &&
            !confirmPasswordControls.errors['mustMatch']
          ) {
            return;
          }
    
          if (passwordControl.value !== confirmPasswordControls.value) {
            confirmPasswordControls.setErrors({ mustMatch: true });
          } else {
            confirmPasswordControls.setErrors(null);
          }
        };
      }
    

  signup() {
        if (this.setForm.invalid) return;
        this.authService
          .signupUser(this.setForm.value)
          .then((result) => {
            if (result == null) {
              this.authService.getCurentUser().then((result) => {
                this.authService.changeUser(result);
                this.data.insert(
                  result,
                  'users',
                  this.setForm.value.username,
                  this.setForm.value.email,
                  false,
                  this.setForm.value.password,
                  this.setForm.value.password2nd,
                  this.setForm.value.fname,
                  this.setForm.value.lname,
                  this.setForm.value.age,
                  true,
                  0
                  );
              });
              this.router.navigate(['/workers-login']);
            } else if (result.isValid == false) {
              this.firebaseErrorMessage = result.messaege;
            }
          })
          .catch(() => {});
      }

      
      

  get username(): FormControl {
    return this.setForm.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.setForm.get('email') as FormControl;
  }  

  get fname(): FormControl {
    return this.setForm.get('fname') as FormControl;
  }

  get lname(): FormControl {
    return this.setForm.get('lname') as FormControl;
  }

  get password(): FormControl {
    return this.setForm.get('password') as FormControl;
  }

  get password2nd(): FormControl {
    return this.setForm.get('password2nd') as FormControl;
  }

  get age(): FormControl {
    return this.setForm.get('age') as FormControl;
  }


}


