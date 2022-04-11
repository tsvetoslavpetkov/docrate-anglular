import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MessageService, MessageType } from '../message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;
  token: string = '';
  message: string = '';
  isError: boolean = false;

  private subscription?: Subscription;

  constructor(
    public authService: AuthService,
    public router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.accessToken$.subscribe((token) => (this.token = token));

    this.subscription = this.messageService.onNew$.subscribe((newMessage) => {
      this.message = newMessage?.text || '';
      this.isError = newMessage.type === MessageType.Error;

      if (this.message) {
        setTimeout(() => {
          this.messageService.clear();
        }, 3000);
      }
    });
  }  

  logoutHandler(): void {
    this.authService.logout$().subscribe(() => {      
    });
    
    this.messageService.notifyMessage({
      text: 'Излязохте от профила си!',
      type: MessageType.Success,
    });
    localStorage.clear();
    this.authService.accessToken = '';
    this.router.navigate([`/`]);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
