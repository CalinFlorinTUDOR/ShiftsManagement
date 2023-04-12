import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  public onSideNavClose() {
    
    this.sidenavClose.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
