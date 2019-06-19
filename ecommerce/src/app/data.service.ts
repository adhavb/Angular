import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from './models/cart';

@Injectable()
export class DataService {
    cart$: Cart[];
    private carts = new BehaviorSubject(this.cart$);
    currentCart = this.carts.asObservable();

    constructor() { }

    changeCart(cart: Cart[]) {
        console.log('changing cart ' + JSON.stringify(cart));
        this.carts.next(cart);
    }

}