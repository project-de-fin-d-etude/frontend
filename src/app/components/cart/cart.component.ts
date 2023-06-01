import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any
  sub_total: number = 0
  orderForm!: FormGroup;
  constructor(private router: Router, private http: HttpService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      items: new FormControl("", [Validators.required,]),
      user_id: new FormControl(localStorage.getItem('id'), [Validators.required,]),
      total_price	: new FormControl("", [Validators.required,]),
    });
    this.cart = localStorage.getItem('product_array') ? JSON.parse(localStorage.getItem('product_array')!) : []
    this.calculate_sub_total()
  }
  remove_item = (id: any) => {
    this.cart = this.cart.filter((item: any) => item.id !== id)
    localStorage.setItem('product_array', JSON.stringify(this.cart))
    this.calculate_sub_total()
  }
  place_order() {
    let id = localStorage.getItem('id')
    this.orderForm.value.items = this.cart
    this.orderForm.value.total_price = this.sub_total+600
    if (id) {
      this.http.post('order',this.orderForm.value).subscribe((res: any) => {
        if (res?.status == 200) {
          this.router.navigate(['/order-confirmed'])
          localStorage.removeItem('product_array')
        }
      })
    }
    else {
      this.router.navigate(['/login'])
    }
  }
  calculate_sub_total = () => {
    this.sub_total = 0
    this.cart.forEach((item: any) => {
      this.sub_total += item.price * item.qnt
    })
    return this.sub_total
  }
}
