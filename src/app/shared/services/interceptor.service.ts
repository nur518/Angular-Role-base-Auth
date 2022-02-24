import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { map, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})

//implements: we have to follow the class
export class InterceptorService implements HttpInterceptor {
  token = "";
  /*
  I created a variable called omitCalls where 
  I have added the keyword that URL will possess like if the URL is auth/login or auth/forgot-password then in those cases, 
  I won’t have any token to append and hence I don’t want those calls to be intercepted.
  */
  omitCalls = ["auth"];
  skipInterceptor = false;

  constructor(private auth: AuthService, private router: Router) {}

  //HttpInterceptor provide an intercept method
  //The intercept method receives the request as a parameter  and a handler for passing the request down to the processing pipelines.
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.omitCalls.forEach((api) => {
      if (req.url.includes(api)) {
        this.skipInterceptor = true;
      }
    });

    // get token
    this.token = this.auth.getUserToken();

    if (this.token || this.skipInterceptor) {
      // clone the req
      const tokenizedReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.token),
      });

      // Now we need to pass this new tokenizedReq to the next handler and allow it to go through the processing pipeline.
      // return next.handle(tokenizedReq);
      return next.handle(tokenizedReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status === 401) {
              this.auth.userLoggedOut();
              this.router.navigateByUrl("/login");
            }
          }
          return event;
        })
      );
    } else {
      this.auth.userLoggedOut();
      this.router.navigateByUrl("core/login");
    }
    return next.handle(req);
  }
}
/*

To put in simpler terms:
extends:
Here you get all these methods/properties from the parent class so you don't have to implement this yourself

implements:
Here is a contract which the class has to follow. The class has to implement at least the following methods/properties

*/
