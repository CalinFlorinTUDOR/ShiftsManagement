import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-workers-home',
  templateUrl: './workers-home.component.html',
  styleUrls: ['./workers-home.component.css'],
})
export class WorkersHomeComponent implements OnInit {

  stored!: any;
  helloWorker: string = '';

  constructor(private auth: AuthService, private data: DataService) {}

  ngOnInit(): void {
    this.getCurentUserLoggedIn();
  }

  getCurentUserLoggedIn() {
    const uid = localStorage.getItem('userUID');
    this.data.redeemWorker(uid).then((res) => {
      this.helloWorker = res.username;
    });
  }
}