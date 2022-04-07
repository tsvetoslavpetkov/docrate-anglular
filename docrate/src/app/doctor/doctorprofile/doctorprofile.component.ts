import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
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
    private doctorService: DoctorService,
    private titleService: Title,
  ) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {

      const id = params['id'];
      this.isLoading = true;

      this.doctorService.getDoctor$(id).subscribe({
        next: doctor => {
        this.isLoading = false;
        this.doctor = doctor;
        this.setTitle("DocRate | " + doctor.title + " " + doctor.firstName + " " + doctor.secondName)
        },
        error: error => {
          this.isLoading = false;
          this.isError = true;
        }
      })
    })
  }
}