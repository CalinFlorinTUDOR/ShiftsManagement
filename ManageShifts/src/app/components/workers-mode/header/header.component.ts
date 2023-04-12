import { Component, OnInit, Output,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sideToggle = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    
  }
  OnToggle()
  {
    this.sideToggle.emit();
  }

}
