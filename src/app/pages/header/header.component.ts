import { Component, OnInit } from '@angular/core';
import { loadavg } from 'os';
import { AccountService } from 'src/app/services/account/account.service';
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
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';
  public menu = false;
  public total: number = 0;

  constructor(private orderService:OrderService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.laodBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin()
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

  
  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser && currentUser.role === 'ADMIN'){
      this.isLogin = true;
      this.loginUrl = 'admin/discount';
      this.loginPage = 'Admin';
    } else if(currentUser && currentUser.role === 'USER') {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }
}