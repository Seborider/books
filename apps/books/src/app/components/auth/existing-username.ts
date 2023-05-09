import { map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { Injectable } from '@angular/core';

//decorator, that declares this class as usable in other classes with dependency injection
@Injectable()

//define class and implement AsyncValidator to call validate
export class ExistingUsername implements AsyncValidator {
    //inject UserService
    constructor(private userService: UserService) {}

    //call validate method which takes control as an argument with type of AbstractControl
    validate = (control: AbstractControl) => {
        //extract the value (pointing to the username)
        const { value } = control;
        //call usernameAvailable with the value as argument
        return this.userService.usernameAvailable(value).pipe(
            //process the response of usernameAvailable
            map((response) => {
                //check for exists property in response object
                if (response.exists) {
                    //returns object with the key existingUser set to true.
                    return { existingUser: true };
                }
                //validation passes
                return null;
            })
        );
    };
}
