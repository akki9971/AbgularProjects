import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDisableClick]'
})
export class DisableDirective {

  timeout: any;
  @Output() showDialog: EventEmitter<any> = new EventEmitter();

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(e: KeyboardEvent) {
    e.preventDefault()
  }

  @HostListener('document:keydown.f11', ['$event']) ondownHandler(e: KeyboardEvent) {
    console.log('escoae key', e);
    e.preventDefault()
  }


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showDialog.emit();
        e.preventDefault();
      } , 15000);
  }

  @HostListener('keydown', ['$event']) blockCtrl(e: KeyboardEvent) {
    if (e.ctrlKey && 'cvxspwuaz'.indexOf(e.key) !== -1) {
        e.preventDefault()
      }
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }

  constructor() {
      console.log('inside disbale directive');
   }

}
