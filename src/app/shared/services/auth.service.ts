import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  getUserToken() {
    return "xx.yy.zz";
  }

  userLoggedOut() {
    return localStorage.removeItem("token");
  }

  haveAccess() {
    let logginToken = localStorage.getItem("token") || "";
    let extractToken = logginToken.split(".")[1];
    let atobData = atob(extractToken);
    let data = JSON.parse(atobData);
    console.log(data);
  }
}
