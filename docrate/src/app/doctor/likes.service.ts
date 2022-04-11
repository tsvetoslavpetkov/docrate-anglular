import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private httpClient: HttpClient) {}

  getLikes$(id: string): Observable<string> {
    return this.httpClient.get<string>('https://practice-server-softuni.herokuapp.com/data/likes?where=doctorId%3D%22' + id +'%22&distinct=_ownerId&count');
  }

  getAllLikes$(): Observable<any> {
    return this.httpClient.get<any>('https://practice-server-softuni.herokuapp.com/data/likes');
  }

  hasLiked$(id: string, userId: string): Observable<string> {
    return this.httpClient.get<string>('https://practice-server-softuni.herokuapp.com/data/likes?where=doctorId%3D%22'+ id + '%22%20and%20_ownerId%3D%22' + userId + '%22&count');
  }

  like$(id: string): Observable<string> {
    return this.httpClient.post<string>('https://practice-server-softuni.herokuapp.com/data/likes', {doctorId: id} );
  }
}
