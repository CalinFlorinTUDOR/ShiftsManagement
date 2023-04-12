import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {

  shiftForm!: FormGroup;

  constructor(private fb:FormBuilder) { 

  }

  get shifts() {
    console.log(this.shiftForm.controls)

    return this.shiftForm.get('shifts') as FormArray;
  }
  Shift() {
    const shift = this.fb.group({
    

      date: '',
      beginning_time: '',
      end_time: '',
      price_hour: '',
      shift_place: '',
      total_profit_shift: '',
      

    })
    this.shifts.push(shift)
    
  }
  
  deleteShift(i: number) {
    this.shifts.removeAt(i);
  }

  ngOnInit() {

    this.shiftForm=this.fb.group({
      shifts:this.fb.array([])
    })
  }
}

