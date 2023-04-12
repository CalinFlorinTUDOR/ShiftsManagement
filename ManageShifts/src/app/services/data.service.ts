import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EUser } from '../interfaces/e-user';
import { EShifts } from '../interfaces/e-shifts';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root',
})
export class DataService {
  shift: EShifts;

  startDate: Date;
  endDate: Date;

  subscribe(arg0: (shift: EShifts[]) => void) {
    throw new Error('Method not implemented.');
  }

  insert(
    id: string,
    db_workers: string,
    username: string,
    email: string,
    admin: boolean,
    password: string,
    first_name: string,
    last_name: string,
    age: string,
    repeat_password: string,
    worker_LoggedIn: boolean,
    shift_No: number
  ) {
    this.firestore.collection(db_workers).doc(id).set({
      
      admin: admin,
      age: age,
      email: email,
      firstname: first_name,
      lastname: last_name,
      password: password,
      repeatPassword: repeat_password,
      shiftNumber: shift_No,
      username: username,
      workerLoggedIn: worker_LoggedIn,

    });
  }
  constructor(private firestore: AngularFirestore, private auth: AuthService) {}

  async redeemWorker(id: string): Promise<EUser> {
    let data: EUser;

    await this.firestore
      .collection('workers')
      .doc(id)
      .get()
      .forEach((doc) => {
        data = doc.data() as EUser;
      });
    return data;
  }

  async addShift(shifts: EShifts) {
    // Generate a random ID for the new shift

    const shiftId = this.firestore.createId();

    // Set the shift's ID object to new ones

    shifts.id = shiftId;
    const shiftWorkerUID = shifts.user_id;

    // Add the shift to the Firestore collection using the new ID
    
    await this.firestore.collection('Shifts').doc(shiftId).set(shifts);

    const user = await this.redeemWorker(shifts.user_id);
    user.shift_No++;

    this.firestore.collection('workers').doc(shiftWorkerUID).update({
      shiftNumber: user.shift_No,
    });
  }

  getAllShiftsByUserId(userId: string) {
    return this.firestore
      .collection('/Shifts', (ref) => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' });
  }

  getAllShifts() {
    return this.firestore.collection('/Shifts').valueChanges();
  }

  //add worker

  addPersonnel(personnel: EUser) {
    personnel.id = this.firestore.createId();
    return this.firestore.collection('/workers').add(personnel);
  }

  //get all Workers

  getAllPersonnels() {
    return this.firestore.collection('/workers').snapshotChanges();
  }

  //delete personnel
  
  deletePersonnel(personnel: string) {
    return this.firestore.doc('/workers/' + personnel).delete();
  }

  //delete shift

  deleteShift(shiftId: EShifts) {
    this.redeemWorker(shiftId.user_id).then((res) => {
      this.firestore
        .collection('workers')
        .doc(shiftId.user_id)
        .update({
          shiftNumber: res.shift_No - 1,
        })
        .then((res) => {
          this.firestore.doc('/Shifts/' + shiftId.id).delete();
        });
    });
  }

  deleteShifts(shiftId: string) {
    this.firestore.collection('Shifts').doc(shiftId).delete();
  }
  getCurentUserDetails(uid: string) {
    return this.firestore.collection('workers').doc(uid).get();
  }

  //edit Personnel method

  editPersonnel(personnel: EUser) {
    const employeeId = personnel.id;
    delete personnel.id; // remove  property from the employee object

    return this.firestore.collection('/workers').doc(employeeId).update(personnel);
  }

}







