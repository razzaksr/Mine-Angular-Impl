import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Patients } from './patients';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, Patients]
})
export class PatientModule {}
