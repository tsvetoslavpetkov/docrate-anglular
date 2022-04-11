import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService, MessageType } from 'src/app/core/message.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {

  @ViewChild('createForm') createForm!: NgForm;

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private messageService: MessageService,
    private titleService: Title
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("DocRate | Добавяне на лекар")
  }

  onSubmit(): void {
    let data = this.createForm.value;
    data.nzok ? data.nzok = true : data.nzok = false;
    data.specialityCode = data.speciality.split(' ')[0]
    data.specialityName = data.speciality.split(' ').slice(1).join(' ')

    this.doctorService.create$(this.createForm.value).subscribe({
      next: (doctor:any) => {     
        this.messageService.notifyMessage({
          text: 'Успешно добавихте лекар!',
          type: MessageType.Success
        })
        this.router.navigate([`/${doctor._id}`]);
      },
      complete: () => {
      },
      error: () => {
       //TODO
      }
    })
  }

}
