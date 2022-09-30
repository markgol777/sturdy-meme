import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount/discount.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private service: DiscountService) { }

  ngOnInit(): void { }

}
