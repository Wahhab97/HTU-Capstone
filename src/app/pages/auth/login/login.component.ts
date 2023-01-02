import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    emailControl: new FormControl("", [Validators.required, Validators.email]),
    passwordControl: new FormControl("", [Validators.required])
  });

  // onSubmit() {
  //   //nothing
  // }
}
