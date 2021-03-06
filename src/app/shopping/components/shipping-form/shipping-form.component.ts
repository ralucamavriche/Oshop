import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;


  constructor(private router: Router,
    private auth: AuthService,
    private shoppingCart: ShoppingCartService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe((user: any) => this.userId = user.uid)

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    let result = await this.orderService.placeOrder(order);

    // When you read a node from firebase use $key
    // When you store something in firebase use key
    this.router.navigate(['/order-success', result.key]);

  }

}
