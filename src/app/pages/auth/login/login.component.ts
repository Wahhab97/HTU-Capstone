import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../../lib/services/auth/auth.service";
import {of, switchMap} from "rxjs";
import {User} from "../../../lib/interfaces/user";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private auth: AuthService) {}
  loginForm = new FormGroup({
    emailControl: new FormControl("", [Validators.required, Validators.email]),
    passwordControl: new FormControl("", [Validators.required])
  });

  get email() {
    return this.loginForm.controls.emailControl.value;
  }
  get password() {
    return this.loginForm.controls.passwordControl.value;
  }
  login() {
    this.auth.signIn(this.email+"", this.password+"")
      .then((val) => {
        this.auth.userState$.pipe(
          switchMap((val)=>{
            if(!val) {
              return of(null);
            } else {
              return of(val);
            }
          })
        ).subscribe({
          next: (val) => {
            if(val?.role === 'admin' || val?.role === 'super-admin'){
              this.router.navigate(['admin/']);
            } else if (val?.role === 'user') {
              this.router.navigate(['users', val.id])
            }
          },
        });
      }).catch((error) => {
        console.log(error);
    });
  }
}
