import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IDoctor {
  _ownerId: string;
  title: string;
  firstName: string;
  secondName: string;
  specialityCode: number;
  nzok: boolean;
  price: number;
  address: string;
  specialityName: string;
  speciality: string;
  imageUrl: string;
  _createdOn: number;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private httpClient: HttpClient) {}

  getDoctors$(): Observable<IDoctor[]> {
    return this.httpClient.get<IDoctor[]>('https://practice-server-softuni.herokuapp.com/data/doctors');
  }
  create$(doctorData: IDoctor): Observable<IDoctor> {
    return this.httpClient.post<IDoctor>('https://practice-server-softuni.herokuapp.com/data/doctors', doctorData );
  }

  edit$(id:string, doctorData: IDoctor): Observable<IDoctor> {
    return this.httpClient.put<IDoctor>('https://practice-server-softuni.herokuapp.com/data/doctors/' + id, doctorData );
  }

  getLastFive$(): Observable<IDoctor[]> {
    return this.httpClient.get<IDoctor[]>('https://practice-server-softuni.herokuapp.com/data/doctors?sortBy=_createdOn%20desc&pageSize=5');
  }

  getDoctor$(id: string): Observable<IDoctor> {
    return this.httpClient.get<IDoctor>('https://practice-server-softuni.herokuapp.com/data/doctors/' + id);
  }

  getMyDoctors$(id: string): Observable<IDoctor[]> {
    return this.httpClient.get<IDoctor[]>('https://practice-server-softuni.herokuapp.com/data/doctors?where=_ownerId%3D%22$' +id + '%22');
  }
}
