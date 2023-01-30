import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { DataService } from '../shared/data.service';

import { Cart, ProductCart } from '../shared/interfaces.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cart: any;
  products: any;
  display = false;
    totalPriceAll: number = 0;
  cartOrder: Cart = {
    id: 8,
    userId: 8,
    date: new Date(),
    products: [],
    __v: 0
  };

  constructor(private dataService: DataService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cart = this.cartService.userCart;
    this.cart.products.forEach((product: ProductCart) => {
      if (product.totalprice == undefined) { product.totalprice = 0 }
      this.totalPriceAll = this.totalPriceAll + product.totalprice;
    });
    console.log(this.cart);
  }

  increment(product: ProductCart) { // добавить кол-во товара
    console.log(product)
    if (product.price == undefined) { product.price = 0 }
       product.quantity = product.quantity + 1;
    product.totalprice = (product.quantity) * product.price;
        console.log(this.cart)
    this.countTotalPriceAll(product);
    }

  countTotalPriceAll(product: ProductCart){ // расчет общей стоимости корзины
    this.totalPriceAll = 0;
    this.cart.products.forEach((product: ProductCart) => {
      if (product.totalprice == undefined) { product.totalprice = 0 }
      this.totalPriceAll = parseFloat(this.totalPriceAll.toFixed(2)) + product.totalprice;
    })
  }

  decrement(product: ProductCart) { // уменьшить кол-во товара
    if (product.quantity == undefined) { product.quantity = 0 }
    if (product.price == undefined) { product.price = 0 }
    console.log("1)" + product.quantity)
    if (product.quantity < 2) { product.quantity = 1 }
    else {
      product.quantity = product.quantity - 1;
      console.log("3)" + product.quantity)
      product.totalprice = product.quantity * product.price;
      console.log("4)" + product.quantity)
      this.countTotalPriceAll(product);
    }
  }

  delProduct(numProd: number, totalprice: number) { // удаление товара с корзины перед отправкой заказа
    this.cart.products.splice((numProd), 1);
    console.log(totalprice);
    this.totalPriceAll = parseFloat(this.totalPriceAll.toFixed(2)) - totalprice;
  }

  makeOrder(cart: Cart) { // отправить корзину на сервер
    this.dataService.postMakeOrder(cart).subscribe(res => {
      this.cartOrder = res;
      this.cartOrder.products.forEach(productOrder => {
        this.dataService.getProduct(productOrder.productId).subscribe(res => {
          productOrder.title = res.title;
          this.products = res;
        })
      })
    });
  }
}


