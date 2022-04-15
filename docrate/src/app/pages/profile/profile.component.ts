import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { fade } from 'src/app/animations';
import { AuthService } from 'src/app/auth.service';
import { IDoctor, DoctorService } from 'src/app/doctor/doctor.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fade]

})
export class ProfileComponent implements OnInit {

  @ViewChild('avatarForm') avatarForm!: NgForm;  

  likes: any = [];
  comments: any = [];
  isLoading: boolean = false;
  doctors: IDoctor[] = [];
  avatarUrl: string = 'https://img.favpng.com/15/8/8/user-profile-2018-in-sight-user-conference-expo-business-default-png-favpng-5EdhQJprgN1HKZdx50LCN4zXg.jpg'

  constructor(
    private customerService: DoctorService,
    private authService: AuthService,
    private titleService: Title
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {

    this.authService.getAvatars$().subscribe(avatars => {
      this.avatarUrl = avatars.findLast((x: any) => x.userId === this.authService.userId).imageUrl;
      
    })

    this.setTitle("DocRate | Профил")

    this.isLoading = true;
    this.customerService.getMyDoctors$(this.authService.userId).subscribe(doctors => {
      
      this.isLoading=false;
      this.doctors = doctors;
    })

  }

  onSubmit(): void {
    this.authService.setAvatar$(this.avatarForm.value.avatar, this.authService.userId).subscribe(() => {
      this.authService.getAvatars$().subscribe(avatars => {
        this.avatarUrl = avatars.find((x: any) => x.userId === this.authService.userId).imageUrl;
        this.avatarForm.reset()        
      })
    })
  }

  getLikes(doctorId: string): string {

    let likes = this.likes?.filter((x:any) => x.doctorId == doctorId).length

    return likes
  }

  getComments( doctorId: string ): string {

    let comments = this.comments?.filter((x: any) => x.doctorId == doctorId).length 

    return comments
  }

}
