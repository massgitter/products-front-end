import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AuthRequest} from "../../../request/auth-request";
import {ToastrService} from "ngx-toastr";
import {AuthenticationConfigService} from "../../../services/authentication-config.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  request: AuthRequest;
  authorities;

  constructor(private router: Router,
              private toast: ToastrService,
              private service: AuthService,
              private authenticationConfig: AuthenticationConfigService) {
    this.loginForm = service.loginForm;
    this.request = service.request;
  }
  login() {
    this.request.username = this.loginForm.get('username').value
    this.request.password = this.loginForm.get('password').value
    this.service.login(this.request).subscribe({
      next: (resp) => {
        sessionStorage.setItem(this.authenticationConfig.token, resp.token)
        sessionStorage.setItem(this.authenticationConfig.roleKey, JSON.stringify(resp.role))
        this.authorities = JSON.parse(sessionStorage.getItem('roles'))
        this.router.navigateByUrl("/product/products")
      }
    })
    }

}
