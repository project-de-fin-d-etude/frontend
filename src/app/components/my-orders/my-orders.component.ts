import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  isCollapsed = true;
  orders: any
  constructor(private http: HttpService) { }
  ngOnInit() {
    // make the quard for my orders
    this.get_orders()
  }
  get_orders() {
    this.http.get('orders?user_id=' + localStorage.getItem('id')).subscribe((res: any) => {
      if (res.status == 200) {
        this.orders = res.body
        console.log(this.orders)
        this.orders.forEach((element:any) => {
          element.isCollapsed=true
        });
      }
    })
  }
}
