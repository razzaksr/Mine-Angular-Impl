import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class Patientservice {
  constructor(){
    console.log(`Service being injected`)
  }
  // 📥 Load from localStorage
  loadPatients() {
    const data = localStorage.getItem('patients');
    // this.myPatients = data ? JSON.parse(data) : [];
    return (data)?JSON.parse(data):[]
  }
  saveToStorage(objects: Patient[]) {
    localStorage.setItem('patients', JSON.stringify(objects));
  }
}
