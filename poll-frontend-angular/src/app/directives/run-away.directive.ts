import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRunAway]'
})
export class RunAwayDirective {

  constructor(
    private elementRef: ElementRef<HTMLBaseElement>
  ) { }

  @HostListener('mouseenter') run() {
    this.elementRef.nativeElement.style.transform = `translate(${Math.random()*100-50}px, ${Math.random()*100-50}px)`;
  }

}
