import {AbstractControl, ValidationErrors} from '@angular/forms';
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl): ValidationErrors | null {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('passwordRepeat').value;
    if (password !== confirmPassword && confirmPassword) {
      // AC.get('passwordRepeat').setErrors({MatchPassword: true});
      return {MatchPassword: true};
    } else {
      return null;
    }
  }
}
