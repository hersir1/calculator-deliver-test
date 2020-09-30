import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
	selector: '[appCalculator]'
})
export class CalculatorDirective implements OnInit {
	
	constructor(private element: ElementRef) {
	}
	
	ngOnInit(): void {
		this.element.nativeElement.focus();
	}
	
	@HostListener('keydown', ['$event']) checkSymbol(keydownEvent: KeyboardEvent) {
		keydownEvent.preventDefault();
	}
	
	@HostListener('focus', ['$event'])
	@HostListener('click', ['$event']) putCursorToTheEnd() {
		this.element.nativeElement.selectionStart = this.element.nativeElement.selectionEnd = this.element.nativeElement.value.length;
	}
}
