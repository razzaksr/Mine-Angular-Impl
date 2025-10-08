import { Component } from '@angular/core';
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
export class Patients {
  myPatients = [
    {
        "name": "Moorthi",
        "age":52,
        "height":187,
        "weight": 75,
        "gender":"male"
    },
    {
        "name": "Nandhini",
        "age":25,
        "height":175,
        "weight": 65,
        "gender":"female"
    },
    {
        "name": "Kumar",
        "age":28,
        "height":180,
        "weight": 70,
        "gender":"male" 
    },
    {
        "name": "Ragavi",
        "age":30,
        "height":178,
        "weight": 68,
        "gender":"female"
    }
  ]

  
  patientObj: Patient = {
    "name": "",
    "age":0,
    "height":0,
    "weight": 0,
    "gender":""
  }
  isEdit = false

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
    this.resetForm()
  }
  // delete exists
  deletePatient(which: string):void{
    this.myPatients = this.myPatients.filter(pat=>pat.name!==which)
    this.isEdit=false
  }
}
