import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {map, observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public state$;

  constructor(private router: Router, private auth: AuthService) {
    this.state$ = auth.userState$.pipe(
      map((val) => {
        if(val) {
          console.log(val);
          return true;
        }
        console.log(this.state$);
        return false;
      })
    );
  }

  navigation(location: string) {
    this.router.navigate([location]);
  }
  logOut(){
    this.auth.logOut();
    this.router.navigate(['']);
  }
}
