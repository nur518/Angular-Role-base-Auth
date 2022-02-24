import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InterceptorService } from "./shared/services/interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    /*
    Now we need to add the interceptor as an Angular Provider in the app.module.ts
    
    This is how we register our interceptor with the application pipeline. 
    Restart the application if it is already running to see the interceptor in action.
    */
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
