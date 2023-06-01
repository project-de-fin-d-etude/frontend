import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ParentComponentComponent } from '../parent-component/parent-component.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  submit: boolean = false
  user: any
  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: new FormControl("", [Validators.required,]),
      family_name: new FormControl("", [Validators.required,]),
      email: new FormControl("", [Validators.required,]),
      password: new FormControl("", [Validators.required,]),
      phone_number: new FormControl("", [Validators.required,]),
      address: new FormControl("", [Validators.required,]),
      type: new FormControl("", [Validators.required,]),
    });
    if (localStorage.getItem('id')) {
      this.userForm.controls['password'].disable();
      this.http.get('user?id=' + localStorage.getItem('id')).subscribe((res: any) => {
        if (res?.status == 200) {
          this.user = res.body[0]
          this.userForm.patchValue({
            name: res.body[0].name,
            family_name: res.body[0].family_name,
            email: res.body[0].email,
            password: res.body[0].password,
            phone_number: res.body[0].phone_number,
            address: res.body[0].address,
            type: res.body[0].type,
          })
        }
      })
    } else {
      this.userForm.controls['password'].enable();
    }
  }
  get f() { return this.userForm.controls }

  signup() {
    this.submit = true
    if (!this.userForm.valid) {
      return
    }
    if (this.user) {
      console.log(JSON.stringify(this.userForm.value));
      this.http.post('users?id=' + this.user.id, this.userForm.value).subscribe((res: any) => {
        console.log(res);

      })
    } else {
      this.http.post('register', this.userForm.value).subscribe((res: any) => {
        if (res?.status == 200) {
          console.log(res.body);
          localStorage.setItem('id', res.body.id)
          localStorage.setItem('type', res.body.type)
          if (localStorage.getItem('product_array')) {
            this.router.navigate(['/cart'])
          } else {
            this.router.navigate(['/'])
          }
        }
      })
    }
  }


}
