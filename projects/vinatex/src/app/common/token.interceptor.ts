import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.authService.data$.value?.token!;

    if (token && !request.headers.has("skipTokenInterceptor")) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token).delete("skipTokenInterceptor"),
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !request.headers.has("skipErrorInterceptor")) {
          // debugger
          this.authService.userLogout().subscribe(x => {
            if (x.ok && x.status === 200) {
              this.authService.postLogout();
            }
          })
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
