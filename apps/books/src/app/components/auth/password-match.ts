import { Injectable } from "@angular/core";
import { Validator, AbstractControl } from "@angular/forms";

@Injectable()
export class PasswordMatch implements Validator {
    validate(formGroup: AbstractControl) {
        const { password, passwordConfirmation } = formGroup.value;
        if (password === passwordConfirmation) {
            return null;
        } else {
            return {
                passwordsDontMatch: true,
            };
        }
    }
}
