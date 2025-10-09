import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../models/patient.model';

@Pipe({
  name: 'bmi'
})
export class BmiPipe implements PipeTransform {

  transform(pat:Patient): number {
    const msq = pat.height/100
    const bmi = pat.weight/(msq*msq)
    return bmi
  }

}
