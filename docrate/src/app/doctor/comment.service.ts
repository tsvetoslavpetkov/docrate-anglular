import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {}

  getTotal$(): Observable<any> {
    return this.httpClient.get<any>('https://practice-server-softuni.herokuapp.com/data/comments');
  }
  getAll$(id: string): Observable<string> {
    return this.httpClient.get<string>('https://practice-server-softuni.herokuapp.com/data/comments?where=doctorId%3D%22' + id +'%22');
  }

  getCount$(id: string): Observable<any> {
    return this.httpClient.get<any>('https://practice-server-softuni.herokuapp.com/data/comments?where=doctorId%3D%22'+ id + '%22&distinct=_ownerId&count');
  }

  comment$(id: string, user: string, comment: string,): Observable<string> {
    return this.httpClient.post<string>('https://practice-server-softuni.herokuapp.com/data/comments', {doctorId: id, user, comment} );
  }
}
