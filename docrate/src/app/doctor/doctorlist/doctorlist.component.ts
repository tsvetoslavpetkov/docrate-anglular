import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/animations';
import { CommentService } from '../comment.service';
import { DoctorService, IDoctor } from '../doctor.service';
import { LikesService } from '../likes.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css'],
  animations: [fade]
})
export class DoctorlistComponent implements OnInit {

  isLoading: boolean = false;
  doctors: IDoctor[] = [];
  likes: any = [];
  comments: any = [];

  constructor(
    private doctorService: DoctorService,
    private likesService: LikesService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {

    this.likesService.getAllLikes$().subscribe(likes => this.likes = likes)
    this.commentService.getTotal$().subscribe(comments => this.comments = comments)

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

  getComments( doctorId: string ): string {

    let comments = this.comments?.filter((x: any) => x.doctorId == doctorId).length 

    return comments
  }

}
