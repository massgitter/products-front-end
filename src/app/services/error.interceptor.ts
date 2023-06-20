import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toasterService: ToastrService,
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 400) {
        console.log(err);
        this.toasterService.error('Error Occurred!', err?.statusText);
      } else if (err.status === 404) {
        this.toasterService.error('Error Occurred!', 'Deployment Not Found!');
      } else if (err.status === 500) {
        this.toasterService.error('Error Occurred!', 'Internal Server Error!');
      } else if (err.status === 401 || err.status === 403) {
        this.toasterService.error('Bad credentials you are not allowed to login!');
        this.authService.logOut({userId: 1});
      } else {
        this.toasterService.error('Error Occurred!', 'Please check if you are connected to the internet!');
      }
      return throwError(err.error.message || err.statusText);
    }));
  }
}
