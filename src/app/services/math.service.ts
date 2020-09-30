import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MathService {
    
    constructor() {
    }
    
    sum(a: number, b: number): number {
        return a + b;
    }
    
    difference(a: number, b: number): number {
        return a - b;
    }
    
    multiple(a: number, b: number): number {
        return a * b;
    }
    
    division(a: number, b: number): number {
        return a / b;
    }
    
    pow(a: number, b: number): number {
        return Math.pow(a, b);
    }
}
