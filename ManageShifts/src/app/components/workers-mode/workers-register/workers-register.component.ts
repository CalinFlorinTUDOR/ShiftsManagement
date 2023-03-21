import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  constructor(private fb: FormBuilder,
    private firebaseAuth: AngularFireAuth ) {

    
  }
  async setUser(user:any):Promise<any> {
    try {
      const res = await this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password);
      let lowerEmail;
      res.user.sendEmailVerification();
    } catch (error) {
      console.log('Signup Error:', error);
      if (error.code) {
        return { isValid: false, message: error.message };
      }
      return null;
    }
  }
  ngOnInit() {}

  

  matchPassword(): boolean {
    return this.pass1 === this.pass2;
  }
  
  onSubmit() {
    if (this.matchPassword()) {
      this.addMultipleUsers(this.setForm.value);
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  addMultipleUsers(user: any) {
    if (this.setForm.valid && this.matchPassword()) {
      const key = 'Users';
      let users = JSON.parse(localStorage.getItem(key) || '[]');
      const existingUser = users.find((u: {username: string}) => u.username === user.username);
      if (existingUser) {
        this.setForm.controls.username.setErrors({alreadyExist: true});
        return;
      }
      users = [user, ...users];
      localStorage.setItem(key, JSON.stringify(users));
    }
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


