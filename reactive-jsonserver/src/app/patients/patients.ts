import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Patientservice } from '../services/patientservice';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { BmiPipe } from '../pipes/bmi-pipe';
import { Makeover } from '../directives/makeover';

@Component({
  selector: 'app-patients',
  imports: [ReactiveFormsModule,BmiPipe,Makeover],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class Patients implements OnInit {
  temp: Patient[] = []
  editId : number |null = null
  patientForm!:FormGroup
  constructor(private serv:Patientservice,private fb: FormBuilder){}
  ngOnInit(): void {
    //read all
    this.load()
    this.patientForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      age: ['',[Validators.required, Validators.min(1),Validators.max(100)]],
      height:['',[Validators.required, Validators.min(0)]],
      weight:['',[Validators.required, Validators.min(0)]],
      gender: ['',[Validators.required, Validators.minLength(4)]]
    })
  }
  load(){
    this.serv.getAll().subscribe(pt=>this.temp=pt)
  }
  // read one via object
  // edit(pt:Patient){
  //   // this is easy way to get from temp itself
  //   const obj={...pt}
  //   this.patientForm.patchValue(obj)
  //   console.log(JSON.stringify(obj))
  //   this.isEdit=true
  // }
  // read one via index
  edit(pt:number){
    // if we wish to get it via json-server service
    console.log(`${pt} received at component`)
    // this.serv.getByName(pt).subscribe(p=>{
    //   console.log(`received from jsonserver${JSON.stringify(p)}`)
    //   this.patientForm.patchValue(p[0])
    //   this.isEdit=true
    // })
    this.serv.getById(pt).subscribe(p=>{
      console.log(`received from jsonserver${JSON.stringify(p)}`)
      this.patientForm.patchValue(p)
      this.editId=pt
    })
    // console.log(JSON.stringify(this.patientForm.value))
  }
  remove(id?:number){
    if(id&&confirm("Are you sure to delete?")){
      this.serv.deleteById(id).subscribe(()=>this.load())
    }
  }
  saveOrUp(){
    if(this.patientForm.invalid)return
    const formData = this.patientForm.value
    if(this.editId!=null){
      this.serv.update(this.editId,formData).subscribe(()=>this.load())
      this.editId=null
    }
    else{
      this.serv.create(formData).subscribe(()=>this.load())
    }
    this.patientForm.reset()
  }
}
