import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Product } from './interfaces.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  product!: Product;

  constructor(private http:HttpClient, private router:Router ) { }


  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>("https://fakestoreapi.com/products");
  }

  getProduct(id: number){
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);

  }

  getCategories(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`)
  }

  getCarts():Observable<Cart[]>{
    return this.http.get<Cart[]>("https://fakestoreapi.com/carts")
  }



  setDescription(productId: number ){
    return this.http.get<Product>(`https://fakestoreapi.com/products/${productId}`)

      // this.product = product;
      // console.log("service"+ product.price)
  }


  getSortCarts(startDate:string, EndDate:string):Observable<Cart[]>{
    return this.http.get<Cart[]>(`https://fakestoreapi.com/carts?startdate=${startDate}&enddate=${EndDate}`)
  }

  postMakeOrder(cart:Cart){
   return this.http.post<Cart>('https://fakestoreapi.com/carts',
     cart
    )
  }
}
