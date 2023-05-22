import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordCorrect implements AsyncValidator {
    constructor(private userService: UserService) {}

    validate = (control: AbstractControl) => {
        //password and username value is extracted from the control
        const password = control.value;
        const username = control.parent?.get('username')?.value;

        //return the Observable and pipe it
        return this.userService.passwordCorrect(username, password).pipe(
            //check response from the server
            map((response) => {
                if (response.status === 200) {
                    // password is correct
                    return null;
                } else {
                    //return object for use in validation
                    return { incorrectPassword: true };
                }
            })
        );
    };
}
