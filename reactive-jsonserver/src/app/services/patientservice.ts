import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class Patientservice {
  private dbUrl = 'http://localhost:3000/myPatients'
  constructor(private client:HttpClient){console.log(`server being injected`)}
  getAll():Observable<Patient[]>{
    return this.client.get<Patient[]>(this.dbUrl)
  }
  getByName(name:string): Observable<Patient[]>{
    const got = this.client.get<Patient[]>(`${this.dbUrl}?name=${name}`)
    // console.log(`verifying at service${JSON.stringify(got)}`)
    return got
  }
  getById(id:number): Observable<Patient>{
    const got = this.client.get<Patient>(`${this.dbUrl}/${id}`)
    return got
  }
  deleteById(id:number): Observable<void>{
    return this.client.delete<void>(`${this.dbUrl}/${id}`)
  }
  create(obj:Patient):Observable<Patient>{
    return this.client.post<Patient>(this.dbUrl,obj)
  }
  update(id:number,pat:Patient):Observable<Patient>{
    return this.client.put<Patient>(`${this.dbUrl}/${id}`,pat)
  }
}
