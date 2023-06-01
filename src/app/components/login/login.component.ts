import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  submit: boolean = false
  constructor(private fb:FormBuilder ,private http:HttpService,private router:Router) { }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: new FormControl("",[ Validators.required,]),
      password: new FormControl("", [Validators.required,]),
    });
  }
  get f() { return this.userForm.controls }
  login() {
    this.submit = true
    if (!this.userForm.valid) {
    return
    }
    this.http.post('signIn',this.userForm.value).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res.body);
        localStorage.setItem('id', res.body[0].id)
        localStorage.setItem('type', res.body[0].type)
        if (res.body[0].type==="store_owner") {
        this.router.navigate(['/owner_management'])
        }else{
        this.router.navigate(['/cart'])
        }
      }
    })
  }
}
