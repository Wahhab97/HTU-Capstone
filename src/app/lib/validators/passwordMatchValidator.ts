import {FormControl, FormGroupDirective, NgForm, ValidatorFn} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

export const passwordMatchingValidator :ValidatorFn  = (control)  => {
  const password = control.get('passwordControl')?.value;
  const confirm = control.get('confirmPasswordControl')?.value;

  //invalid
  if(password && confirm
    && password !== confirm
  ){
    return {
      passwordDoesntMatch: true
    };
  }
  return null;
}

export class myErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.hasError('passwordDoesntMatch'));
    return (invalidParent);
  }
}
