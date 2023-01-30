import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pract';

  constructor(private dataService: DataService, private router:Router) {
  }

  getCart() {
    this.router.navigateByUrl('cart');
  }

  getProducts() {
    this.router.navigateByUrl('shop');
  }

  getAdmin(){
    this.router.navigateByUrl('admin');
  }

  ngOnInit(): void {

  }
}





