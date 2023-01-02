import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm= new FormGroup({
    firstNameControl: new FormControl("", [Validators.required]),
    lastNameControl: new FormControl("", [Validators.required]),
    emailControl: new FormControl("", [Validators.required, Validators.email]),
    passwordControl: new FormControl("", [Validators.required]),
    confirmPasswordControl: new FormControl("", [Validators.required]),
    dateOfBirthControl: new FormControl("", [Validators.required])
  });
}
