import { Component, OnInit } from '@angular/core';
import { ParentComponentComponent } from '../parent-component/parent-component.component';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  product_array: any
  quantity: number = 1;
  product: any
  constructor(private parent_component: ParentComponentComponent, private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log(params.id);
      this.get_product(params.id);
    });
    this.product_array = localStorage.getItem('product_array') ? JSON.parse(localStorage.getItem('product_array')!) : [];
  }
  get_product(id: any) {
    this.http.get("products?product_id=" + id).subscribe((response: any) => {
      this.product = response.body.products[0];
      console.log(this.product);

    })
  }
  add_to_cart() {

    let already_in_cart = this.product_array.find((item: any) => item.id == this.product.id);
    if (!already_in_cart) {
      this.product.qnt = this.quantity;
      this.product_array.push(this.product)

    }
    localStorage.setItem('product_array', JSON.stringify(this.product_array));
    this.parent_component.items_in_cart = this.product_array;
    console.log(this.parent_component.items_in_cart);
  }
  add_quantity(id: any) {
    if (this.product.quantity > this.quantity) {
      this.quantity = this.quantity + 1;
      this.product_array.find((item: any) => {
        if (item.id == id) {
          item.quantity = this.quantity
        }
      })
    }
  }
  substract_quantity(id: any) {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
      this.product_array.find((item: any) => {
        if (item.id == id) {
          item.quantity = this.quantity
        }
      })
    }
  }
}
