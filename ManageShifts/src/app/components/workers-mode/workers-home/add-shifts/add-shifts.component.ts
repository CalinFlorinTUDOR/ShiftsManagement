import { AfterContentInit, Component, OnInit} from '@angular/core';
import { EShifts } from 'src/app/interfaces/e-shifts';
import { EUser } from 'src/app/interfaces/e-user';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-add-shifts',
  templateUrl: './add-shifts.component.html',
  styleUrls: ['./add-shifts.component.css']
})
export class AddShiftsComponent implements OnInit, AfterContentInit{

  userId: string;
shiftName: any;
  constructor(private data: DataService, private auth: AuthService, private firestore: AngularFirestore) {}
  
  shiftsList: EShifts[] = [];
  workerShiftLog: EShifts = {
    first_name: '',
    last_name: '',
    id: '',
    date: '',
    start_time: '',
    end_time: '',
    hourly_wage: '',
    work_place: '',
    comments: '',
    user_id: '',
    total_earnings: '',
  };

  id: string = '';
  date: string = '';
  startTime: string = '';
  endTime: string = '';
  wage: string = '';
  shiftPlace: string = '';
  comment: string = '';

  ngOnInit() {
    this.userId = localStorage.getItem('userUID');

    this.getUserShifts();
  }

  ngAfterContentInit(): void {}

  addShift() {
    if (
      this.date == '' ||
      this.startTime == '' ||
      this.endTime == '' ||
      this.wage == '' ||
      this.shiftPlace == '' ||
      this.comment == ''
    ) {
      alert('Fill all the inputs');
      return;
    }
    const start = new Date(`01/01/2021 ${this.startTime}`);
    const end = new Date(`01/01/2021 ${this.endTime}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const totalEarnings = (hours * parseInt(this.wage)).toFixed(2);

    this.auth.getCurentUser().then((res) => {
      this.data.redeemWorker(res).then((res) => {
        this.workerShiftLog.first_name = res.first_name;
        this.workerShiftLog.last_name = res.last_name;
        this.workerShiftLog.id = this.id;
        this.workerShiftLog.date = this.date;
        this.workerShiftLog.start_time = this.startTime;
        this.workerShiftLog.end_time = this.endTime;
        this.workerShiftLog.hourly_wage = this.wage;
        this.workerShiftLog.work_place = this.shiftPlace;
        this.workerShiftLog.comments = this.comment;
        this.workerShiftLog.total_earnings = totalEarnings;
        this.workerShiftLog.user_id = this.userId;

        this.data.addShift(this.workerShiftLog);

        this.resetForm();
      });
    });
  }

  resetForm() {
    this.date = '';
    this.startTime = '';
    this.endTime = '';
    this.wage = '';
    this.shiftPlace = '';
    this.comment = '';
  }

  clearFileds() {}

  getUserShifts() {
    this.data.getAllShiftsByUserId(this.userId).subscribe((shifts: EShifts[]) => {
      this.shiftsList = shifts;
    });
  }
  editShift(shift: EShifts) {
    this.data.deleteShifts(shift.id);
    this.id = shift.id;
    this.date = shift.date;
    this.startTime = shift.start_time;
    this.endTime = shift.end_time;
    this.wage = shift.hourly_wage;
    this.shiftPlace = shift.work_place;
    this.comment = shift.comments;
  }
  
}


