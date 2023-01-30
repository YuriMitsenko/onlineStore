import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Cart } from './interfaces.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private dataService: DataService,) { }

  userCart: Cart = {
    id: 8,
    userId: 8,
    date: new Date(),
    products: [],
    __v: 0,
  }
  title: string = "";
  totalPriceAll: number = 0;

  addCarts(productid: number, quan: number) {
    this.dataService.getProduct(productid).subscribe(res => {
      console.log(res.title)
      this.title = res.title, this.userCart.products.push({ productId: productid, quantity: quan, title: this.title, price: res.price, totalprice:quan*res.price })
      this.totalPriceAll = this.totalPriceAll + quan*res.price;
    });
  }

  incrementPrice(totalprice:number){
    this.totalPriceAll = this.totalPriceAll + totalprice;
  }

  decrementPrice(totalprice:number){
    console.log("5)" +  this.totalPriceAll)
    console.log("6)" + this.totalPriceAll)
    this.totalPriceAll = this.totalPriceAll - totalprice;
    console.log("7)" + this.totalPriceAll)
  }
}
