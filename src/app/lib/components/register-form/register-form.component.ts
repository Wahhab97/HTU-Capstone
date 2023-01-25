import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {myErrorStateMatcher, passwordMatchingValidator} from "../../validators/passwordMatchValidator";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  constructor(private router: Router, private auth: AuthService) {}

  @Input() role!: "admin"|'user';
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
    console.log(this.firstName?.value);
    this.auth.signUp(
      this.firstName?.value+"",
      this.lastName?.value+"",
      this.email?.value+"",
      this.password?.value+"",
      this.role
    ).then((user) => {
      this.router.navigate(['']);
    }).catch((error) => console.log(error));
  }
}
