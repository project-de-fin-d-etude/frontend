import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.scss']
})
export class ParentComponentComponent implements OnInit {
  items_in_cart: any = [];
  user: any
  is_logged_in: boolean = false;
  mYproducts:boolean=false;
  constructor(private http: HttpService,private router:Router) { }
  ngOnInit() {
    localStorage.getItem('type')==='store_owner'?this.mYproducts=true:this.mYproducts=false;
    this.is_logged_in = localStorage.getItem('id') ? true : false;
    console.log(this.is_logged_in);
    localStorage.getItem('product_array') ? this.items_in_cart = JSON.parse(localStorage.getItem('product_array')!) : [];
    console.log(this.items_in_cart);
    if (this.is_logged_in) {
      this.http.get('user?id=' + localStorage.getItem('id')).subscribe((res: any) => {
        if (res.status == 200) {
          console.log(res);
          this.user = res.body[0];
          console.log(this.user);

        }
      })
    }
  }

  logout() {
    localStorage.removeItem('type');
    localStorage.removeItem('id');
    localStorage.removeItem('product_array');
    this.is_logged_in = false;
  }
  navigate(fragement:any){
    console.log(fragement);

    this.router.navigateByUrl('#',fragement)
  }

}
