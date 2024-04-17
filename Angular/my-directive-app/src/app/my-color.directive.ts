import { Directive, ElementRef, Host, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[color]',
  standalone: true
})
export class MyColorDirective {
  @Input("color") color:string = "";

  constructor(private el : ElementRef<HTMLSpanElement>) { }
  
  @HostListener("mouseenter") onMouseEnter() {
    this.el.nativeElement.style.color = this.color;
  
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.color = 'black';
  }
}
