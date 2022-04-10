import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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

  message: string = '';
  isError: boolean = false;

  private subscription?: Subscription;

  constructor(
    public authService: AuthService,
    public router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  logoutHandler(): void {
    this.authService.logout$().subscribe({
      next: () => {
        this.messageService.notifyMessage({
          text: 'Излязохте от профила си!',
          type: MessageType.Success})
        this.router.navigate(['/home']);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('_id');
        localStorage.removeItem('email');
        
      },
      complete: () => {
        console.log('logout stream completed');
      },
      error: () => {
        //TODO
      },
    });
  }
}
