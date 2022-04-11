import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm!: NgForm;

  public constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle('DocRate | Регистрация');
  }

  ngAfterViewInit(): void {
  }
  
  onSubmit(): void {    

    let userdata = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.authService.register$(userdata).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      complete: () => {
      },
      error: () => {
       //TODO
      }
    })
  }
}
