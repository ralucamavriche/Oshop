import { ShoppingCart } from './shopping-cart';
import 'rxjs/add/operator/map';

export class Order {
    datePlaced: number;
    items: any[];


    constructor(public userId: string, public shopping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getDate();

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        })
    }
}