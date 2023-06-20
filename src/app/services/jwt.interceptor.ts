import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationConfigService } from "./authentication-config.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationConfig: AuthenticationConfigService) {}

  intercept(
    request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = sessionStorage.getItem(this.authenticationConfig.token);
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`,
          "Cache-Control":
           "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          "Cache-Control":
            "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    }

    return next.handle(request);
  }
}
