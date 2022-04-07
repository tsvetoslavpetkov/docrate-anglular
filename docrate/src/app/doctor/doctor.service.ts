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

  getDoctor$(id: string): Observable<IDoctor> {
    return this.httpClient.get<IDoctor>('https://practice-server-softuni.herokuapp.com/data/doctors/' + id);
  }
}
