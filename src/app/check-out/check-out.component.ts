import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private shoppingCart: ShoppingCartService,
    private orderService: OrderService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCart.getCart();
    this.cartSubscription = cart$.subscribe((cart: any) => this.cart = cart);
    this.userSubscription = this.auth.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();

  }


  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    // When you read a node from firebase use $key
    // When you store something in firebase use key
    this.router.navigate(['/order-success', result.key]);

  }
}
