import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {UserLoginResponse} from "../repsonses/user-login-response";
import {BaseService} from "./base-service";
import {ApiConfiguration} from "./api-configuration";
import {HttpClient} from "@angular/common/http";
import {AuthRequest} from "../request/auth-request";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LogoutRequest} from "../request/logout-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  authorities;
  loginForm: FormGroup
  request: AuthRequest;
  private static readonly loginPath: string = '/authentication/login'
  private static readonly logoutPath: string = '/authentication/logout'
  constructor(config: ApiConfiguration,
              http: HttpClient,
              private router: Router,
              private toast: ToastrService) {
    super(config, http)
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    this.request = {
      username: '',
      password: ''
    }
  }

  login(request: AuthRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.rootUrl + AuthService.loginPath, request)
  }

  logOut(logOutRequest: LogoutRequest): Observable<any>{
    return  this.http.post(this.rootUrl + AuthService.logoutPath, logOutRequest)
  }
}
