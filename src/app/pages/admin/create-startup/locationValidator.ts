import {FormControl, FormGroupDirective, NgForm, ValidatorFn} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

export const locationValidator :ValidatorFn  = (control)  => {
  const latitude = control.get('latitude');
  const longitude = control.get('longitude');

  //invalid
  if((latitude?.pristine  || longitude?.pristine) || (longitude?.value == 0 || latitude?.value == 0)){
    return {
      locationIsNotValid: true
    };
  }
  return null;
}

export class locationMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.hasError('locationIsNotValid'));
    return (invalidParent);
  }
}
