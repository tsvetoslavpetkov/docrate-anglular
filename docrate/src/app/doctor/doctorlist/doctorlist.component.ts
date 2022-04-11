import { Component, OnInit } from '@angular/core';
import { DoctorService, IDoctor } from '../doctor.service';
import { LikesService } from '../likes.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  isLoading: boolean = false;
  doctors: IDoctor[] = [];
  likes: any = [];

  constructor(
    private doctorService: DoctorService,
    private likesService: LikesService
  ) { }

  ngOnInit(): void {

    this.likesService.getAllLikes$().subscribe(likes => this.likes = likes)

    this.isLoading = true;
    this.doctorService.getDoctors$().subscribe(doctors => {
      this.isLoading=false;
      this.doctors = doctors;
    })

  }

  getLikes(doctorId: string): string {

    let likes = this.likes?.filter((x:any) => x.doctorId == doctorId).length

    return likes
  }

}
