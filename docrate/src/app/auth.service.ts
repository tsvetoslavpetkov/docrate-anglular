import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IUser {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private _currentUser = new BehaviorSubject<IUser>(undefined!);

  currentUser$ = this._currentUser.asObservable()
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user))

  login$(userData: {email: string, password: string}): any {
    return this.httpClient
    .post<IUser>('https://practice-server-softuni.herokuapp.com/users/login', userData, {observe: 'response'})
    .pipe(
      map(res => res.body)
    )
    
  }

  // register$(userData): Observable<IUser>{
  //   return this.httpClient.post<IUser>('https://practice-server-softuni.herokuapp.com/auth/register', userData)
  // }

  logout$(): Observable<Object> {
    let token = localStorage.getItem('auth_token');
    return this.httpClient.get('https://practice-server-softuni.herokuapp.com/users/logout', { headers: {
      'X-Authorization' : token!
    }})
  }

  handleLogin (newUser: IUser){
    this._currentUser.next(newUser)

  }
}
