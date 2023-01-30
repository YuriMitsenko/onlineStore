import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],

})


export class PaginationComponent implements OnInit {

  @Input('page') totalItems: number = 5;
  pageSize: number = 5;
  totalPages: number = 1;
  pagesArray: number[] | undefined;
  @Output() newItemEvent = new EventEmitter<number>();

  ngOnInit(): void {

  }

  ngAfterContentChecked(): void{ // кол-во кнопок в пагинации
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pagesArray = new Array(this.totalPages)
  }

  getPage(i: number){ // передача в род комп № страницы
    this.newItemEvent.emit(i);
    console.log("№стр пагин" + i)
  }


}
