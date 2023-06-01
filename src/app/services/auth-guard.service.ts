import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AccountService} from "./account.service";
import {Observable} from "rxjs";
import {LoginResponse} from "../models/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    let currentUser: LoginResponse = this.accountService.userValue;
    if (Object.keys(currentUser).length !== 0) {
      // if (next.data['roles'] && next.data['roles'].indexOf(currentUser.role_id) === -1) {
      //   // user is not authorized to access the route
      //   this.router.navigate(['/access-denied']);
      //   return false;
      // }
      // user is authorized to access the route
      return true;
    }

    console.log("not Activated");
    // user is not logged in, redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
