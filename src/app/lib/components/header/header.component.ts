import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {map, observable} from "rxjs";

type BarItem ={
  itemName:String;
  itemPath: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  public state$;
  barItems: BarItem[] =[];

  constructor(private router: Router, private auth: AuthService) {
    this.state$ = auth.userState$.pipe(
      map((val) => {
        if(val) {
          if(val.role === "user") {
            this.barItems = [
              {itemName: "Request", itemPath: ''},
            ];
          } else if(val.role === "admin") {
            this.barItems = [
              {itemName:'Home', itemPath:'admin'},
              {itemName:'Create Startup', itemPath: 'admin/createStartup'},
              {itemName:'Requests', itemPath:"admin/requests"}
            ];
          } else if(val.role === "super-admin") {
            this.barItems = [
              {itemName:'Home', itemPath:'admin'},
              {itemName:'Create Startup', itemPath: 'admin/createStartup'},
              {itemName:'Requests', itemPath:"admin/requests"},
              {itemName: "Create Admin", itemPath:"admin/createAdmin"}
            ];
          }
          return true;
        }
        this.barItems =[
          {itemName: "Home", itemPath: "/"},
          {itemName: "About", itemPath: "about"},
          {itemName: "Contact", itemPath: "#contact"}
        ];
        return false;
      })
    );
  }

  navigation(location: string) {
    this.router.navigate([location]);
  }
  logOut(){
    this.auth.logOut().then(() => {
        this.router.navigate(['/'])
    });
  }
}
