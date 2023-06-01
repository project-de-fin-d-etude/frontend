import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from "@angular/forms";

@Component({
  selector: 'app-owner-management',
  templateUrl: './owner-management.component.html',
  styleUrls: ['./owner-management.component.scss']
})
export class OwnerManagementComponent implements OnInit {
  categories: any
  products: any
  selectedFile: any = null;
  selectedVideo: any = null;
  imgUrl: any
  videoUrl: any
  product_form!: FormGroup;
  submit: boolean = false
  edit: boolean = false
  product: any
  constructor(private http: HttpService, private fb: FormBuilder) { }
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
  ngOnInit(): void {
    this.get_categories();
    this.get_products();
    this.product_form = this.fb.group({
      name: new FormControl("", [Validators.required,]),
      description: new FormControl("", [Validators.required,]),
      quantity: new FormControl("", [Validators.required,]),
      price: new FormControl("", [Validators.required,]),
      image_name: new FormControl("",),
      category_id: new FormControl("", [Validators.required,]),
      weight: new FormControl("", [Validators.required,]),
      dimensions: new FormControl("", [Validators.required,]),
      owner_id: new FormControl(localStorage.getItem('id'), [Validators.required,]),
    });
  }
  get f() { return this.product_form.controls }
  get_categories() {
    this.http.get('categories').subscribe((res: any) => {
      if (res?.status == 200) {
        this.categories = res.body.categories;
        console.log(this.categories);
      }
    }
    );
  }
  get_products() {
    this.http.get('product?owner_id=' + localStorage.getItem('id')).subscribe((res: any) => {
      if (res?.status == 200) {
        this.products = res.body.products;
        console.log(this.products);
      }
    }
    );
  }
  add_product() {
    this.edit = false
    this.product_form.reset()
    this.imgUrl = ""
    this.childModal?.show();
    this.submit = false
    this.selectedFile = null
    this.product=null
  }
  showChildModal(product: any): void {
    this.childModal?.show();
    this.edit = true
    this.product = product
    this.product_form.patchValue({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      image_name: product.image_name,
      category_id: product.category_id,
      weight: product.weight,
      dimensions: product.dimensions,
      owner_id: localStorage.getItem('id'),
    })
    console.log(this.product_form.value);

    this.imgUrl = "http://127.0.0.1:8000/uploads/products/" + product.image_name
  }

  hideChildModal(): void {
    this.childModal?.hide();
  }
  showPreviewImage(event: any,) {
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = <File>event.target.files[0];
    }
  }
  showPreviewVideo(event: any) {
    console.log(event.target.files[0]);

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedVideo = file
  }
  manage_product() {
    this.submit = true
    this.product_form.patchValue({
      owner_id: localStorage.getItem('id'),
    })
    if (this.product_form.invalid) {
      return
    }
    console.log(JSON.stringify(this.product_form.value));

    const fd = new FormData()
    fd.append('name', this.product_form.value.name)
    fd.append('description', this.product_form.value.description)
    fd.append('quantity', this.product_form.value.quantity)
    fd.append('price', this.product_form.value.price)
    fd.append('image', this.selectedFile ? this.selectedFile : this.product.image_name || null)
    fd.append('video', this.selectedVideo ? this.selectedVideo : this.product.video_name || null)
    fd.append('category_id', this.product_form.value.category_id)
    fd.append('weight', this.product_form.value.weight)
    fd.append('dimensions', this.product_form.value.dimensions)
    fd.append('owner_id', this.product_form.value.owner_id)

    if (this.edit) {
      fd.append('id', this.product.id)
      this.http.post('edit_product/', fd).subscribe((res: any) => {
        if (res?.status == 200) {
          console.log(res);
          Object.assign(this.product, res.body)
          this.hideChildModal()
        }
      }, (error) => {
        // Handle any errors
      })
    } else {
      this.http.post('add_product', fd).subscribe((res: any) => {
        if (res?.status == 200) {
          this.products.push(res.body)
          this.hideChildModal()
        }
      }, (error) => {
      })
    }

  }
  delete_product() {
    this.http.delete("delete_product?id="+this.product.id).subscribe(res=>{
      console.log(res);
      if(res?.status==200){
        this.products.splice(this.products.indexOf(this.product),1)
        this.hideChildModal()
      }

    })
  }
}
