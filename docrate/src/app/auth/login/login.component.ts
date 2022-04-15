import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { fade } from 'src/app/animations';
import { AuthService } from 'src/app/auth.service';
import { MessageService, MessageType } from 'src/app/core/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fade]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  public constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle('DocRate | Вход');
  }

  ngAfterViewInit(): void {
  }
  
  onSubmit(): void {    
    this.authService.login$(this.loginForm.value).subscribe({
      next: () => {
        this.messageService.notifyMessage({
          text: 'Успешен вход!',
          type: MessageType.Success
        })
        this.router.navigate(['/home']);
      }
    })
  }
}
