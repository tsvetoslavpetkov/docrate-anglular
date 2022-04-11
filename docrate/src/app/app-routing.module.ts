import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/auth.guard';
import { GuestGuard } from './core/guest.guard';
import { CreateDoctorComponent } from './doctor/create-doctor/create-doctor.component';
import { DoctorprofileComponent } from './doctor/doctorprofile/doctorprofile.component';
import { EditComponent } from './doctor/edit/edit.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component'
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'contacts',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [GuestGuard],
    component: RegisterComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: EditComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateDoctorComponent
  },
  {
    path: 'doctor/:id',
    component: DoctorprofileComponent
  },  
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
