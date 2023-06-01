import { Component, OnInit, } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private http: HttpService) { }
  center: any;
  products: any
  categories: any
  zoom: any
  messages: string[] = [];
  user: any
  is_logged_in: boolean = false;
  mYproducts: boolean = false;
  ngOnInit(): void {
    localStorage.getItem('type') === 'store_owner' ? this.mYproducts = true : this.mYproducts = false;
    this.is_logged_in = localStorage.getItem('id') ? true : false;
    if (this.is_logged_in) {
      this.http.get('user?id=' + localStorage.getItem('id')).subscribe((res: any) => {
        if (res.status == 200) {
          console.log(res);
          this.user = res.body[0];
          console.log(this.user);

        }
      })
    }
    this.get_products("products");
    this.get_categories();
    this.center = {
      lat: 36.8782115,
      lng: 7.7145808,
    };

  }
  get_products(url: any) {
    this.http.get(url).subscribe((res: any) => {
      if (res?.status == 200) {
        this.products = res.body.products;
        console.log(this.products);
      }
    }
    );
  }
  get_categories() {
    this.http.get('categories').subscribe((res: any) => {
      if (res?.status == 200) {
        this.categories = res.body.categories;
        console.log(this.categories);
      }
    }
    );
  }
  onSelect(category?: any) {
    let category_id = category ? category.id : "";
    this.get_products("products?category_id=" + category_id);
  }
  message(s: string) {
    this.messages.push(s);
  }
  logout() {
    localStorage.removeItem('type');
    localStorage.removeItem('id');
    localStorage.removeItem('product_array');
    this.is_logged_in = false;
  }
}
