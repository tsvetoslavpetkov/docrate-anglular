import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IUser {
  email: string;
  _id: string;
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public userId: string = '';
  public accessToken: string = '';
  private _currentUser = new BehaviorSubject<IUser>(undefined!);

  currentUser$ = this._currentUser.asObservable()
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user))
  userId$ = this.currentUser$.pipe(map(user => user._id))
  accessToken$ = this.currentUser$.pipe(map(user => user.accessToken))

  login$(userData: {email: string, password: string}): any {
    return this.httpClient
    .post<IUser>('https://practice-server-softuni.herokuapp.com/users/login', userData, {observe: 'response'})
    .pipe(
      map(res => res.body)
    )    
  }

  register$(userData: {email: string, password: string}): Observable<IUser>{
    return this.httpClient.post<IUser>('https://practice-server-softuni.herokuapp.com/users/register', userData)
  }

  logout$(): Observable<any> {
    return this.httpClient.get('https://practice-server-softuni.herokuapp.com/users/logout')
  }

  authenticate(){
    if(localStorage.getItem('accessToken')){
      let user = {
        '_id' : localStorage.getItem('_id'),
        'email' : localStorage.getItem('email'),
        'accessToken' : localStorage.getItem('accessToken')        
      } 
      this.handleLogin(user);
    }

  }

  handleLogin (newUser : any){
    this._currentUser.next(newUser)    
    this.userId = newUser._id;  
    this.accessToken = newUser.accessToken
  }

  

}
