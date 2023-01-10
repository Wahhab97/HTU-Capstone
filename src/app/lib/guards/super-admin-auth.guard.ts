import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.userState$.pipe(
      map((val) => {
        if(val?.role === "super-admin"){
          return true;
        }
        this.router.navigate(['admin/']);
        return false;
      })
    );

  }
}
