import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { RouterModule } from '@angular/router';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';



@NgModule({
  declarations: [
    DoctorlistComponent,
    DoctorprofileComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DoctorlistComponent
  ]
})
export class DoctorModule { }
