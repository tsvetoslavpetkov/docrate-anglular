import { Component, OnInit } from '@angular/core';
import { DoctorService, IDoctor } from 'src/app/doctor/doctor.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  doctors: IDoctor[] = [];

  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {

    this.doctorService.getLastFive$().subscribe(doctors => {
      this.doctors = doctors
    })

  }

}
