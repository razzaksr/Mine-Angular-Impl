import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../models/patient.model';
import { Patientservice } from '../services/patientservice';
import { BmiPipe } from '../pipes/bmi-pipe';

@Component({
  selector: 'app-patients',
  imports:[ReactiveFormsModule,BmiPipe],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class Patients implements OnInit{
   
  // temporary
  myPatients: Patient[] = []

  // form
  patientForm!:FormGroup
  
  editIndex : number | null=null

  // dependency injection of Service here in constructor
  constructor(private fb: FormBuilder, private service:Patientservice) {}

  ngOnInit(): void {
    // this.loadPatients()
    // call service methods
    this.service.loadPatients()
    this.patientForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      age: ['',[Validators.required, Validators.min(1),Validators.max(100)]],
      height:['',[Validators.required, Validators.min(0)]],
      weight:['',[Validators.required, Validators.min(0)]],
      gender: ['',[Validators.required, Validators.minLength(4)]]
    })
  }
  // // 📥 Load from localStorage
  // loadPatients(): void {
  //   const data = localStorage.getItem('patients');
  //   this.myPatients = data ? JSON.parse(data) : [];
  // }

  // 💾 Save to localStorage
  // saveToStorage(): void {
  //   localStorage.setItem('patients', JSON.stringify(this.myPatients));
  // }

  // create new patient in myPatients list/ update exists
  addOrUpdatePatient(){
    if(this.patientForm.invalid)return
    const formData = this.patientForm.value
    if(this.editIndex!==null){
      this.myPatients[this.editIndex] = formData
      this.editIndex=null
    }
    else{
      this.myPatients.push(formData)
    }
    // this.saveToStorage()
    this.service.saveToStorage(this.myPatients)
    this.patientForm.reset()
  }
  // read patient/ load into fields from table
  editPatient(index: number){
    const patient = this.myPatients[index]
    this.patientForm.patchValue(patient)
    this.editIndex = index
  }
  deletePatient(index:number):void{
    if(confirm("Are you sure to delete this ?")){
      this.myPatients.splice(index,1)
      // this.saveToStorage()
      this.service.saveToStorage(this.myPatients)
    }
  }
}