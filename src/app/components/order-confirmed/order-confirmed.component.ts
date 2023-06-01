import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.scss']
})
export class OrderConfirmedComponent implements OnInit {
user:any
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.get_user();
  }

  get_user() {
    this.http.get('user?id=' + localStorage.getItem('id')).subscribe((res: any) => {
      if (res.status == 200) {
        this.user = res.body[0];
        console.log(this.user)
      }

    })
  }

}
