import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
  Route
} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.userState$
      .pipe(
        map((value)=> {
          if(!value) {
            return true
          } else {
            this.router.navigate(['admin/']);
            return false;
          }
        })
      );

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userState$
      .pipe(
        map((value)=> {
          if(!value) {
            return true
          } else {
            this.router.navigate(['admin/']);
            return false;
          }
        })
      );
  }

}
