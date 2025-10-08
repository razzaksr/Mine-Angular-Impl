import { Component, signal } from '@angular/core';
import { NewItem } from './new-item/new-item';
import { ViewItems } from './view-items/view-items';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NewItem,ViewItems],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('basic-app');

  items: string[] = ["Tower Speaker", "Microsoft surface"];
  found: string = ''

  addToCart(newTodo: string){
    if(newTodo){
      this.items.push(newTodo)
      console.log(this.items)
    }
  }

  handleDelete(index: number){
    this.items.splice(index,1)
  }

  handleEdit(index: number){
    this.found = this.items[index]
    // console.log(`to be edited ${this.found} at app`)
  }
}


// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('basic-app');
// }
