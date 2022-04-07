import { Component, OnInit } from '@angular/core';
import { DoctorService, IDoctor } from '../doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  isLoading: boolean = false;
  doctors: IDoctor[] = [];

  constructor(
    private customerService: DoctorService
  ) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.customerService.getDoctors$().subscribe(doctors => {
      this.isLoading=false;
      this.doctors = doctors;
    })

  }

}
