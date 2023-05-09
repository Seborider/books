import { Injectable } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';

//decorator, that declares this class as usable in other classes with dependency injection
@Injectable()

//create class and implement the Validator interface, meaning it must provide a 'validate' method.
export class PasswordMatch implements Validator {
    //call validate method with formGroup of type AbstractControl
    validate(formGroup: AbstractControl) {
        //extract values of 'password' and 'passwordConfirmation' from the formGroup value property
        const { password, passwordConfirmation } = formGroup.value;
        //validation passes and null is therefore returned
        if (password === passwordConfirmation) {
            return null;
        } else {
            // return an object with a passwordsDontMatch property set to true
            return {
                passwordsDontMatch: true,
            };
        }
    }
}
