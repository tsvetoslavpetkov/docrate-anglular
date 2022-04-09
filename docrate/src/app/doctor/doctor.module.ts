import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { RouterModule } from '@angular/router';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { SharedModule } from '../shared/shared.module';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { Title } from '@angular/platform-browser';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DoctorlistComponent,
    DoctorprofileComponent,
    CreateDoctorComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    DoctorlistComponent,
    CreateDoctorComponent
  ], providers: [
    Title
  ],
})
export class DoctorModule { }
