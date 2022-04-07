import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService, IDoctor } from '../doctor.service';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css'],
})
export class DoctorprofileComponent implements OnInit {
  doctor!: IDoctor;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {

      const id = params['id'];
      this.isLoading = true;

      this.doctorService.getDoctor$(id).subscribe({
        next: doctor => {
        this.isLoading = false;
        this.doctor = doctor;
        },
        error: error => {
          this.isLoading = false;
          this.isError = true;
        }
      })
    })
  }
}