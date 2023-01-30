import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { DataService } from '../shared/data.service';
import { Product } from '../shared/interfaces.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  quantity: string | null | undefined;
  product: Product = {
    category: "",
    description: "",
    id: 0,
    image: "",
    price: 0,
    rating: { count: 0, rate: 0 },
    title: ""
  }

  constructor(private router: Router, private dataService: DataService, private cartService: CartService, private activatedRoute: ActivatedRoute) { }

  goBack() {
    this.router.navigate([`../`])
  }

  addProductCart(product: Product) {
    console.log(product);
    let quan = 0;
    if (product.quantity != undefined) { quan = product.quantity }
    this.cartService.addCarts(product.id, quan)
    // console.log(this.userCart);
  }

  ngOnInit(): void {
    let productId = 0;
    this.activatedRoute.params.subscribe(param => productId = param['id-lesson']);
    this.dataService.setDescription(productId).subscribe(res => { this.product = res });
  }
}
