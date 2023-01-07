import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {myErrorStateMatcher, passwordMatchingValidator} from "../../../lib/validators/passwordMatchValidator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router) {
  }
  registerForm= new FormGroup({
    firstNameControl: new FormControl("", [Validators.required]),
    lastNameControl: new FormControl("", [Validators.required]),
    emailControl: new FormControl("", [Validators.required, Validators.email]),
    passwordControl: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmPasswordControl: new FormControl("", [Validators.required, Validators.minLength(8)]),
  }, [passwordMatchingValidator]);

  matcher = new myErrorStateMatcher();
  get firstName() {
    return this.registerForm.get("firstNameControl");
  };
  get lastName() {
    return this.registerForm.get("lastNameControl");
  };
  get email() {
    return this.registerForm.get("emailControl");
  };
  get password() {
    return this.registerForm.get("passwordControl");
  };
  signup() {
    console.log(this.registerForm);
  }
}
