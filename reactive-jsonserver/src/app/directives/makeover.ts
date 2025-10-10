import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMakeover]'
})
export class Makeover {

  @Input('appMakeover') set appMakeOver(value:number){
    let col = ''
    if(value<=18)
      col='grey'
    else if(value>18&&value<=24)
      col='maroon'
    else if(value>24&&value<=28)
      col='orange'
    else
      col='red'

    this.renderer.setStyle(this.el.nativeElement,'color',col)
  }

  constructor(private el:ElementRef, private renderer:Renderer2) { }
  
}
