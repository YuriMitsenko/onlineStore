import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Cart } from '../shared/interfaces.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  carts: Cart[] = [];
  totalprice: number = 0;
  totalPriceAll: number = 0;
  startDate: string = "";
  EndDate: string = "";
  idCart: number = 0;


  constructor(private dataService: DataService) {
  }

  ngOnInit(): void { // получаем массив корзин со свойствами price и title
    this.dataService.getCarts().subscribe(res => {
      this.carts = res;
      this.addPriceAndTitle();
    })
  }

  addPriceAndTitle(): void {// добавляем значение свойствам price и title + расчет итоговой стоимости корзины
    this.carts.forEach(cart => {
      cart.totalpriceCart = 0;

      cart.products.forEach(product => {
        this.dataService.getProduct(product.productId).subscribe(res => {
          product.price = res.price;
          product.title = res.title;
          if (cart.totalpriceCart != undefined)
            cart.totalpriceCart = parseFloat(cart.totalpriceCart.toFixed(2)) + product.price * product.quantity;
        })
      })
    })
  }

  ngAfterContentChecked(): void { // расчет стоимоси всех корзин
    this.totalPriceAll = 0;
    this.carts.forEach(cart => {
      if (cart.totalpriceCart != undefined)
        this.totalPriceAll = parseFloat(this.totalPriceAll.toFixed(2)) + cart.totalpriceCart;
    })
  }

  chooseStartDate(e: HTMLInputElement): void { // получаем дату начала выборки
    this.startDate = e.value;
    console.log(this.startDate);
  }

  chooseEndDate(e: HTMLInputElement) { // получаем дату конца выборки
    this.EndDate = e.value;
    console.log(this.EndDate);
  }

  showSort() { // сортируем по дате
    this.dataService.getSortCarts(this.startDate, this.EndDate).subscribe(res => {
      console.log(res);
      this.carts = res;
      this.addPriceAndTitle();
    })
  }

  show(id: number) { // номер для отображения подробностей о товаре, для ngSwitchCase
    if (id != this.idCart) {
      this.idCart = id;
    }
    else { this.idCart = 0 };
  }
}
