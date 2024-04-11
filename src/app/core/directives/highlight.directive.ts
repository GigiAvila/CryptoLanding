import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() public isFavouriteCoin?: boolean;
  @HostBinding('style.backgroundColor') public get background(): string {
    if (!this.isElementFocused) {
      return '#ffffff';
    }
    return this.isFavouriteCoin ? '#fbd2d2' : '#b1def9';
  }
  @HostListener('mouseenter') public onMouseEnter(): void {
    this.isElementFocused = true;
  }
  @HostListener('mouseleave') public onMouseLeave(): void {
    this.isElementFocused = false;
  }

  public isElementFocused: boolean = false;
}
