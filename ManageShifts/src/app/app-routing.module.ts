import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersHomeComponent } from './components/workers-mode/workers-home/workers-home.component';
import { WorkersLoginComponent } from './components/workers-mode/workers-login/workers-login.component';
import { WorkersRegisterComponent } from './components/workers-mode/workers-register/workers-register.component';

const routes: Routes = [
  
  { path:'', redirectTo:'', pathMatch:'full'},
  { path: 'workers-home', component: WorkersHomeComponent },
  { path: 'workers-register', component: WorkersRegisterComponent },
  { path: 'workers-login', component: WorkersLoginComponent,},
  { path:'**', redirectTo:'workers-register', pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
