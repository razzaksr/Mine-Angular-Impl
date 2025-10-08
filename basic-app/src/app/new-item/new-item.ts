import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-item',
  imports: [ReactiveFormsModule],
  templateUrl: './new-item.html',
  styleUrl: './new-item.css'
})
export class NewItem implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['exists']&&changes['exists'].currentValue!==undefined){
      this.newItem.setValue(changes['exists'].currentValue)
    }
  }
  @Input() exists: string = ''
  // mapping item in html form
  newItem = new FormControl('')
  // output variable
  @Output() newTodo = new EventEmitter<string>();
  submitTodo(){
    // read data given in html text box
    const current = this.newItem.value?.trim()
    if(current){
      // if data exists in text box set to output variable
      this.newTodo.emit(current)
      // show data in console readed from html text box
      console.log(current)
      this.newItem.setValue("")
    }
  }
}
