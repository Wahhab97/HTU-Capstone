import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanLoad, CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  guard$ = this.auth.userState$.pipe(
    map((val) => {
      if(val?.role === 'super-admin' || val?.role === 'admin'){
        return true;
      }
      this.router.navigate(['auth/login']);
      return false
    })
  );
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard$;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard$;
  }
}
