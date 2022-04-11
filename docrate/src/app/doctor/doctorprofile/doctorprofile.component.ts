import { Component, OnChanges, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DoctorService, IDoctor } from '../doctor.service';
import { LikesService } from '../likes.service';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css'],
})
export class DoctorprofileComponent implements OnInit {
  doctor!: IDoctor;
  isLoading: boolean = false;
  isError: boolean = false;
  isOwner: boolean = false;
  isLoggedIn$ = this.authService.isLoggedIn$;
  hasLiked: boolean = false;
  id: string = ''
  likes: string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private titleService: Title,
    private likesService: LikesService,
    private authService: AuthService
  ) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {

      const id = params['id'];
      this.id = id;
      this.isLoading = true;

      this.likesService.getLikes$(id).subscribe(likes => this.likes = likes)
      this.likesService.hasLiked$(id, this.authService.userId).subscribe(hasLiked => this.hasLiked = !!hasLiked)

      this.doctorService.getDoctor$(id).subscribe({
        next: doctor => {
        this.isOwner = doctor._ownerId == this.authService.userId ? true : false;
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

  likeHandle(): void {
    this.likesService.like$(this.doctor._id).subscribe(()=>{
      this.likesService.getLikes$(this.id).subscribe(likes => this.likes = likes)
      this.likesService.hasLiked$(this.id, this.authService.userId).subscribe(hasLiked => this.hasLiked = !!hasLiked)
    })
  }

}