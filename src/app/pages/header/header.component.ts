import { Component, OnInit } from '@angular/core';
import { loadavg } from 'os';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public show: boolean = false;
  public basket: Array<any> = [];
  public showCircle:boolean = false;

  public menu = false;
  public total: number = 0;

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.laodBasket();
    this.updateBasket();
  }

  showMenu() {
    if (this.menu === false) this.menu = true;
    else if (this.menu === true) this.menu = false; 
  }

  hideMenu() {
    this.menu = false;
  }

  laodBasket() {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string); 
    }
    
    this.getTotalPrice(); 
  }


  getTotalPrice() {
    this.total =
      this.basket.reduce((total: number, prod: any) => total + prod.orderedProduct * prod.price, 0)
  }

  updateBasket() {
    this.orderService.changeBasket.subscribe(() => {
      this.laodBasket();
      this.showCircleFunction();
    })
  }
    
  showCart() {
    if (this.show === true) {
      this.show = false;
    } else {
      this.show = true;
    }

    console.log(this.basket);
  }

  showCircleFunction() {
    if (this.basket.length > 0) {
      this.showCircle = true;
    } else {
      this.showCircle = false;
    }
  }

  
}