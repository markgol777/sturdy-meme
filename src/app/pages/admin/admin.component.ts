import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { DiscountService } from 'src/app/services/discount/discount.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private service: DiscountService, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void { }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

}
