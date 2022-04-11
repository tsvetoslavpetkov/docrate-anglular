import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageService, MessageType } from 'src/app/core/message.service';
import { DoctorService, IDoctor } from '../doctor.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;

  id: string = '';
  doctor: any = {
    address: "",
  firstName: "",
  imageUrl: "",
  nzok: true,
  price: 2,
  secondName: "",
  speciality: "",
  specialityCode: 2,
  specialityName: "",
  title: ""};

  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];

      this.doctorService.getDoctor$(this.id).subscribe({
        next: (doctor) => {
          console.log(doctor);
          
          this.doctor = doctor;

          if(this.doctor._ownerId != this.authService.userId){
            this.messageService.notifyMessage({
              text: 'Не сте собственик на лекаря!',
              type: MessageType.Error,
            });
            this.router.navigate([`/${doctor._id}`])
          }

        },
        error: () => {
          this.router.navigate([`/not-found`]);
        },
      });
    });
  }

  onSubmit(): void {
    let data = this.editForm.value;
    data.nzok ? (data.nzok = true) : (data.nzok = false);
    data.specialityCode = data.speciality.split(' ')[0];
    data.specialityName = data.speciality.split(' ').slice(1).join(' ');

    console.log(data);
    

    this.doctorService.edit$(this.id, this.editForm.value).subscribe({
      next: (doctor: any) => {
        this.messageService.notifyMessage({
          text: 'Успешно редактирахте лекаря!',
          type: MessageType.Success,
        });
        this.router.navigate([`/${doctor._id}`]);
      },
      complete: () => {},
      error: () => {
        //TODO
      },
    });
  }
}
