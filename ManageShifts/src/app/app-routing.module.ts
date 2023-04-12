import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/workers-mode/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/workers-mode/verify-email/verify-email.component';
import { AddShiftsComponent } from './components/workers-mode/workers-home/add-shifts/add-shifts.component';
import { EditProfileComponent } from './components/workers-mode/workers-home/edit-profile/edit-profile.component';
import { ShiftsComponent } from './components/workers-mode/workers-home/shifts/shifts.component';
import { WorkersHomeComponent } from './components/workers-mode/workers-home/workers-home.component';
import { WorkersLoginComponent } from './components/workers-mode/workers-login/workers-login.component';
import { WorkersRegisterComponent } from './components/workers-mode/workers-register/workers-register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  
  { path:'', redirectTo:'workers-login', pathMatch:'full'},
  { path: 'workers-home', 
    component: WorkersHomeComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'shifts', component: ShiftsComponent
      },
      {
        path: 'add-shifts', component: AddShiftsComponent
      },
      
      {
        path: 'edit-profile', component: EditProfileComponent
      }
    ]
  },
  { path: 'workers-register', component: WorkersRegisterComponent },
  { path: 'workers-login', component: WorkersLoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path:'**', redirectTo:'workers-login', pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
