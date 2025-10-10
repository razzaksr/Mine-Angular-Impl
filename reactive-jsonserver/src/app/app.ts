import { Component, signal } from '@angular/core';
import { Patients } from "./patients/patients";

@Component({
  selector: 'app-root',
  imports: [Patients],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('reactive-jsonserver');
}
