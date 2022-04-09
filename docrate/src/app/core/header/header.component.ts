import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  logoutHandler(): void {
    this.authService.logout$().subscribe({
      next: () => {
        this.router.navigate(['/home']);
        localStorage.removeItem('auth_token');
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
