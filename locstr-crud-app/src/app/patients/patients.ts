import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Patient {
  "name": string,
  "age":number,
  "height":number,
  "weight": number,
  "gender":string
}

@Component({
  selector: 'app-patients',
  imports: [FormsModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class Patients implements OnInit{
   
  // temporary
  myPatients: Patient[] = []
  
  patientObj: Patient = {
    "name": "",
    "age":0,
    "height":0,
    "weight": 0,
    "gender":""
  }
  isEdit = false

  ngOnInit(): void {
    this.loadPatients()
  }
  // 📥 Load from localStorage
  loadPatients(): void {
    const data = localStorage.getItem('patients');
    this.myPatients = data ? JSON.parse(data) : [];
  }

  // 💾 Save to localStorage
  saveToStorage(): void {
    localStorage.setItem('patients', JSON.stringify(this.myPatients));
  }

  resetForm(){
    this.patientObj = {
      "name": "",
      "age":0,
      "height":0,
      "weight": 0,
      "gender":""
    }
    this.isEdit=false
  }
  // create new patient in myPatients list
  registerPatient():void{
    this.myPatients.push(this.patientObj)
    this.saveToStorage()
    this.resetForm()
  }
  // read patient/ load into fields from table
  editPatient(pat: Patient):void{
    this.isEdit=true
    this.patientObj=pat
  }
  // update exists
  updatePatient():void{
    this.myPatients = this.myPatients.map(pat=>pat.name===this.patientObj.name?this.patientObj:pat)
    this.saveToStorage()
    this.resetForm()
  }
  // delete exists
  deletePatient(which: string):void{
    if(confirm("Are you sure to delete this ?")){
      this.myPatients = this.myPatients.filter(pat=>pat.name!==which)
      this.isEdit=false
      this.saveToStorage()
    }
  }
}