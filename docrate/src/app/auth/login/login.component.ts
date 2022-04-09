import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginForm') laptopForm!: NgForm;

  public constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loginHandler(email: string, password: string) {
    console.log(email, password);
  }

  ngOnInit(): void {
    this.setTitle('DocRate | Вход');
  }

  ngAfterViewInit(): void {
    console.log(this.laptopForm.value);
  }

  
  onSubmit(): void {
    
    this.authService.login$(this.laptopForm.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      complete: () => {
        console.log('login stream completed');
      },
      error: () => {
       //TODO
      }
    })
  }
}
