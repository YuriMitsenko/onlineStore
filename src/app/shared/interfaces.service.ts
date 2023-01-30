import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InterfacesService {

  constructor() { }

}
export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating | undefined;
  title: string;
  quantity?: number;
}
export interface Rating{
  count: number;
  rate:  number;
}

export interface Cart{
  id: number;
  userId: number;
  date: any;
  products: ProductCart[];
  __v: number;
  totalpriceCart?: number;
 }

export interface ProductCart{
  productId: number;
  quantity: number;
  price?: number;
  title?: string;
  totalprice?: number;
}
