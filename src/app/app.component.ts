import {Component, OnInit} from '@angular/core';
import {MathService} from './services/math.service';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
/*TODO
*   1) 10x
*   2) Корень
*   3) Пи
*   3) Пробелы
* */
export class AppComponent {
	
	private currentNumber: string = '';
	private numberRegexp = /[0-9]/;
	private actionRegexp = /[\+\-\^/\*]/;
	
	value: string = '';
	result: string;
	braceCount: number = 0;
	
	constructor(private mathService: MathService,
	            private nzModalService: NzModalService) {
	}
	
	getResult() {
		let array = this.value.split(' ').filter(elem => elem !== ' ' && elem !== '');
		
		if (array.includes('(')) {
			array = this.getArrayWithResultFromExpressionInBraces(array);
		}
		this.result = this.calculateArray(array);
	}
	
	concatNumber(value: string) {
		if (this.value && this.value.charAt(this.value.length - 2) === ')') {
			return;
		}
		this.value = this.value + value;
		this.currentNumber = this.currentNumber + value;
	}
	
	backspace() {
		if (this.currentNumber) {
			this.value = this.value.slice(0, -1);
			this.currentNumber = this.currentNumber.slice(0, -1);
		} else {
			this.value = this.value.slice(0, -2);
		}
	}
	
	clearInput() {
		this.value = '';
		this.result = '';
		this.currentNumber = '';
		this.braceCount = 0;
	}
	
	concatAction(action: string) {
		if (this.currentNumber && this.currentNumber.charAt(this.currentNumber.length - 1) !== '.') {
			this.value = this.value + ' ' + action + ' ';
			this.currentNumber = '';
		}
	}
	
	concatOpenBrace() {
		const lastSymbol = this.value.charAt(this.value.length - 2);
		
		if (!this.currentNumber && lastSymbol !== ')' && this.value) {
			this.value = this.value + ' ( ';
			this.braceCount++;
			this.currentNumber = '';
		}
	}
	
	concatCloseBrace() {
		const lastSymbol = this.value.charAt(this.value.length - 2);
		
		if (this.braceCount > 0) {
			if (this.currentNumber && this.currentNumber.indexOf('.') > -1) {
				return;
			}
			if (this.currentNumber || lastSymbol.match(this.numberRegexp)) {
				this.value = this.value + ' ) ';
				this.braceCount--;
			}
		}
	}
	
	concatDot(dot: string) {
		if (this.currentNumber) {
			if (this.currentNumber.indexOf('.') === -1) {
				this.value = this.value + dot;
				this.currentNumber = this.currentNumber + dot;
			}
		}
	}
	
	keydown(event: KeyboardEvent) {
		if (event.key.match(this.numberRegexp)) {
			this.concatNumber(event.key);
		}
		if (event.key.match(this.actionRegexp)) {
			this.concatAction(event.key);
		}
		if (event.key === ')') {
			this.concatCloseBrace();
		}
		if (event.key === '(') {
			this.concatOpenBrace();
		}
		if (event.key === 'Backspace') {
			this.backspace();
		}
		if (event.key === 'Enter') {
			this.getResult();
		}
	}
	
	createInfoModal() {
		this.nzModalService.info({
			nzTitle: 'Пока не сделано',
			nzOkType: 'primary'
		});
	}
	
	private getArrayWithResultFromExpressionInBraces(array: Array<string>): Array<string> {
		let start;
		let end;
		
		for (let i = 0; i < array.length; i++) {
			if (array[i] === '(') {
				start = i;
			}
			if (array[i] === ')') {
				end = i;
				array.splice(start, end - start + 1, this.calculateArray(array.slice(start + 1, end)));
				break;
			}
		}
		
		if (array.includes('(')) {
			return this.getArrayWithResultFromExpressionInBraces(array);
		} else {
			return array;
		}
	}
	
	private doAllDivisions(array: Array<string>): Array<string> {
		const indexOfDivisionSign = array.indexOf('/');
		
		const [value1, value2] = this.getTwoValues(array, indexOfDivisionSign);
		const result = this.mathService.division(value1, value2);
		
		array.splice(indexOfDivisionSign - 1, 3, result.toString());
		
		if (array.includes('/')) {
			return this.doAllDivisions(array);
		} else {
			return array;
		}
	}
	
	private doAllMultiples(array: Array<string>): Array<string> {
		const indexOfMultipleSign = array.indexOf('*');
		
		const [value1, value2] = this.getTwoValues(array, indexOfMultipleSign);
		const result = this.mathService.multiple(value1, value2);
		
		array.splice(indexOfMultipleSign - 1, 3, result.toString());
		
		if (array.includes('*')) {
			return this.doAllMultiples(array);
		} else {
			return array;
		}
	}
	
	private doAllDifference(array: Array<string>): Array<string> {
		const indexOfDifferenceSign = array.indexOf('-');
		
		const [value1, value2] = this.getTwoValues(array, indexOfDifferenceSign);
		const result = this.mathService.difference(value1, value2);
		
		array.splice(indexOfDifferenceSign - 1, 3, result.toString());
		
		if (array.includes('-')) {
			return this.doAllDifference(array);
		} else {
			return array;
		}
	}
	
	private doAllSum(array: Array<string>): Array<string> {
		const indexOfSumSign = array.indexOf('+');
		
		const [value1, value2] = this.getTwoValues(array, indexOfSumSign);
		const result = this.mathService.sum(value1, value2);
		
		array.splice(indexOfSumSign - 1, 3, result.toString());
		
		if (array.includes('+')) {
			return this.doAllSum(array);
		} else {
			return array;
		}
	}
	
	private doAllPower(array: Array<string>): Array<string> {
		const indexOfPowerSign = array.indexOf('^');
		
		const [value1, value2] = this.getTwoValues(array, indexOfPowerSign);
		const result = this.mathService.pow(value1, value2);
		
		array.splice(indexOfPowerSign - 1, 3, result.toString());
		
		if (array.includes('^')) {
			return this.doAllPower(array);
		} else {
			return array;
		}
	}
	
	private getTwoValues(array: Array<string>, index: number): Array<number> {
		return [array[index - 1].includes('.') ? parseFloat(array[index - 1]) : parseInt(array[index - 1], 10),
			array[index + 1].includes('.') ? parseFloat(array[index + 1]) : parseInt(array[index + 1], 10)];
	}
	
	private calculateArray(array: Array<string>): string {
		if (array.includes('^')) {
			array = this.doAllPower(array);
		}
		if (array.includes('/')) {
			array = this.doAllDivisions(array);
		}
		if (array.includes('*')) {
			array = this.doAllMultiples(array);
		}
		if (array.includes('-')) {
			array = this.doAllDifference(array);
		}
		if (array.includes('+')) {
			array = this.doAllSum(array);
		}
		return array[0];
	}
}
