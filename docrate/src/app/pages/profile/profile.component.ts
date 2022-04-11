import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import { IDoctor, DoctorService } from 'src/app/doctor/doctor.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLoading: boolean = false;
  doctors: IDoctor[] = [];

  constructor(
    private customerService: DoctorService,
    private authService: AuthService,
    private titleService: Title

  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {

    this.setTitle("DocRate | Профил")

    this.isLoading = true;
    this.customerService.getMyDoctors$(this.authService.userId).subscribe(doctors => {
      this.isLoading=false;
      this.doctors = doctors;
    })

  }

}
