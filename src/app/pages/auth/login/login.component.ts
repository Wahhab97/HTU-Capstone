import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {
  }
  loginForm = new FormGroup({
    emailControl: new FormControl("", [Validators.required, Validators.email]),
    passwordControl: new FormControl("", [Validators.required])
  });

  onSubmit() {

  }
}
