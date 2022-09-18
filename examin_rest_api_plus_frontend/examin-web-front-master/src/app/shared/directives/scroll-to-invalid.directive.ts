import { Directive, Input, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({ selector: '[scrollToFirstInvalid]' })
export class ScrollToFirstInvalidDirective {
    @Input('scrollToFirstInvalid') form: NgForm;

    constructor() { }

    @HostListener('submit', ['$event'])
    onSubmit(event) {
        if (!this.form.valid) {
            const firstElementWithError = document.querySelector('.ng-invalid');
            this.scrollTo(firstElementWithError);
        }
    }

    scrollTo(el: Element): void {
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
