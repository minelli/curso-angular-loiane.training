import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highligth]'
})
export class HighligthDirective {

  @HostListener('mouseenter') onMouseOver() {
    this.backgroundColor = this.highligthColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor: string;

  @Input()
  defaultColor: string = 'white';

  @Input('highligth')
  highligthColor: string = 'yellow';


  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

}
