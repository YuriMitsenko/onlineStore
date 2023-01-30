import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { DataService } from '../shared/data.service';
import { Cart, Product } from '../shared/interfaces.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})


export class ProductComponent implements OnInit {

  constructor(private dataService: DataService, private cartService: CartService, private router:Router  ) {

  }

  products: Product[] = [];
  category: string = "";
  amountPage: number = 0;
  arrayProductPage: Product[] = [];
  userCart: Cart = {
    id: 8,
    userId: 8,
    date: new Date(),
    products: [],
    __v: 0
  }


  setSortUp(): void { // сортируем от дешев к дорогим
    this.dataService.getProducts().subscribe((res: Product[]) => {
      res.sort((f: { price: number; }, n: { price: number; }): number => {
        return f.price < n.price ? -1 : 1;
      });
      this.products = res;
      console.log(this.products);
      this.getNumbPage(0);
    });
  }

  setSortDown(): void { // сортируем от дорогих к дешев
    this.dataService.getProducts().subscribe((res: Product[]) => {
      res.sort((f: { price: number; }, n: { price: number; }): number => {
        return f.price < n.price ? 1 : -1;
      });
      this.products = res;
      this.getNumbPage(0);
    });
  }

  setCategory($event: any): void { // фильтр по категориям продуктов
    console.log(this.category)
    this.category = $event.target.value;
    console.log(this.category)
    if (this.category == "start") { this.dataService.getProducts().subscribe(res => { console.log(res), this.ngOnInit(), this.amountPage = this.arrayProductPage.length }); }
    else {
      this.dataService.getCategories(this.category).subscribe(res => { console.log(res), this.arrayProductPage = res, this.amountPage = this.arrayProductPage.length });
    }
  }

  setDescription(productId: number): void { // подробное описание одного элемента товара
    this.router.navigate(['descr', productId]);

    console.log(productId);
  }

  ngOnInit(): void { // выведение всех эл-нтов товаров
    this.dataService.getProducts().subscribe(res => {
      console.log(res),
        this.products = res,
        this.arrayProductPage = this.products.filter((item: { id: number; }) => item.id > 0 && item.id < 6), // для загрузки первой страницы
        this.amountPage = this.products.length,
        console.log(this.amountPage)
    });
  }

  getNumbPage(numbPage: number) { // выведение 5 товаров на 1 странице - пагинация
    console.log("номер стр" + numbPage);
    let indexstart: number = 5 * numbPage;
    let indexEnd: number = 5 * numbPage + 5;
    console.log(indexstart, indexEnd)
    // this.arrayProductPage = this.products.filter((item: { id: number; }) => item.id > indexstart && item.id < indexEnd)
    this.arrayProductPage = this.products.slice(indexstart, indexEnd);
    console.log(this.arrayProductPage)
  }

  addProductCart(product:Product) { // добавляем продукт(id и кол-во) в корзину
    console.log(product.id);
    let quan = 1;
    // if (product.quantity != undefined){ quan = 1 }
    this.cartService.addCarts(product.id,quan)
    console.log(this.userCart);
  }

}



