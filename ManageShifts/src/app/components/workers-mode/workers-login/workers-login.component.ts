import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-workers-login',
  templateUrl: './workers-login.component.html',
  styleUrls: ['./workers-login.component.css']
})
export class WorkersLoginComponent implements OnInit {

  loginForm = new FormGroup ({

      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])

    });
    
  constructor() { }

  ngOnInit() {}

  onSubmit() {

    this.loginData(this.loginForm.value);
  
  }

    loginData(user: any) {

      if (this.loginForm.valid) {
      let users = [];
      if (localStorage.getItem('Users')) {
        users = JSON.parse(localStorage.getItem('Users' ) || '[]');
        users = [user, ...users];

        localStorage.setItem('Users', JSON.stringify(users));

    } else {
      users = [user];
      
      localStorage.setItem('Users', JSON.stringify(users));

    }
  }
    
    }

  get email(): FormControl {
      return this.loginForm.get('email') as FormControl;
    }  

    get password(): FormControl {
      return this.loginForm.get('password') as FormControl;
    }  

}





