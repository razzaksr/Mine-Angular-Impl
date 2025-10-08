import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-items',
  imports: [],
  templateUrl: './view-items.html',
  styleUrl: './view-items.css'
})
export class ViewItems {
  @Input() tempCart: string[] = []
  @Output() toBeDeleted = new EventEmitter<number>()
  @Output() toBeEdited = new EventEmitter<number>()
  delete(index: number){
    this.toBeDeleted.emit(index)
  }
  edit(index: number){
    // console.log(`to be edited ${index} at view items`)
    this.toBeEdited.emit(index)
  }
}
