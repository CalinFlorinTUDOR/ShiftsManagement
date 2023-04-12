import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EUser } from 'src/app/interfaces/e-user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})


export class EditProfileComponent implements OnInit{

    editProfileForm = new FormGroup ({

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
userInfoEdit: FormGroup<any>;

  constructor(private fb: FormBuilder, private firebaseAuth: AngularFireAuth, private auth: AuthService, private data: DataService, private firestore: AngularFirestore ) { }


  ngOnInit(): void {
    this.getUserRecords();
  }
  getUserRecords() {
    throw new Error('Method not implemented.');
  }

  
  
  async editUser(email: string, password: string):Promise<any> {
    try {
      const res = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
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
  
  


  matchPassword(): boolean {
    return this.pass1 === this.pass2;
  }
  
  onSubmit() {

    this.editUser(this.editProfileForm.value.email, this.editProfileForm.value.password)
    if (this.matchPassword()) {
      this.addMultipleUsers(this.editProfileForm.value);
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  addMultipleUsers(user: any) {
    if (this.editProfileForm.valid && this.matchPassword()) {
      const key = 'Users';
      let users = JSON.parse(localStorage.getItem(key) || '[]');
      const existingUser = users.find((u: {username: string}) => u.username === user.username);
      if (existingUser) {
        this.editProfileForm.controls.username.setErrors({alreadyExist: true});
        return;
      }
      users = [user, ...users];
      localStorage.setItem(key, JSON.stringify(users));
    }
  }

  

  get username(): FormControl {
    return this.editProfileForm.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.editProfileForm.get('email') as FormControl;
  }  

  get fname(): FormControl {
    return this.editProfileForm.get('fname') as FormControl;
  }

  get lname(): FormControl {
    return this.editProfileForm.get('lname') as FormControl;
  }

  get password(): FormControl {
    return this.editProfileForm.get('password') as FormControl;
  }

  get password2nd(): FormControl {
    return this.editProfileForm.get('password2nd') as FormControl;
  }

  get age(): FormControl {
    return this.editProfileForm.get('age') as FormControl;
  }
}

