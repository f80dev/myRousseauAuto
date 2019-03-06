import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {api, direct_api, openGeneral, reload} from '../tools';
import {UserService} from '../user.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import {ConfigService} from '../config.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword=false;
  email="";
  password="";
  showResendCode=false;
  handleLogin=null;

  constructor(public deviceService: DeviceDetectorService,
              public userService:UserService,public config:ConfigService,
              public api:ApiService,public router:Router,public routes:ActivatedRoute) {
    config.init();
  }

  ngOnInit() {
    this.email=localStorage.getItem("email") || this.routes.snapshot.queryParamMap.get("email");
    if(this.email=="null")this.email=null;

    this.password=localStorage.getItem("password") || this.routes.snapshot.queryParamMap.get("password");
    if(this.email!=null && this.password!=null){
      setTimeout(()=>{this.login();},1000);
    }
  }

  login(manual=false) {
    localStorage.setItem("email",this.email);
    this.api.login(this.email,this.password).subscribe((r:any)=>{
      if(!this.showPassword){
        if(r==null){
          if(manual)
            this.router.navigate(['/newuser'],{ queryParams: { email: this.email} });
        }
        else
          this.showPassword=true;
      } else {
        if(r!=null){
          clearInterval(this.handleLogin);
          localStorage.setItem("password",this.password);
          this.userService.init(this.email);
          this.router.navigate(["start"]);
        } else {
          if(this.password!=null){
            this.showResendCode=true;
          }
        }
      }
    })
  }

  clearEmail() {
    this.email="";
    this.showPassword=false;
  }

  keypress($event) {
    if($event.keyCode==13){
      this.showPassword=true;
      this.login();
    }

  }

  loginService(service: string) {
    var domain=location.href.replace("https://","").replace("http://","").replace("/login","");
    domain=domain.replace("/","_slash_");
    openGeneral(service,"https://www.shifumix.com").then((data:any)=>{
      this.email=data.email;
      this.password=data.password;
      clearInterval(this.handleLogin);
      this.handleLogin=setInterval(()=>{
        this.showPassword=true;
        this.login();
        },1000);
    })
  }

  resend_code() {
    this.api.resend_code(this.email).subscribe(()=>{
      this.showPassword=true;
    });
  }
}
